import { Injectable, NotFoundException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ListingStatus, SheepListing, SaleSource } from '@prisma/client';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { CreateSheepListingDto, UpdateSheepListingDto, SheepListingsFilterDto } from './dto/sheep-listing.dto';

@Injectable()
export class SheepListingsService {
    constructor(private prisma: PrismaService) {}

    async findAll(filter: SheepListingsFilterDto) {
        const where: Prisma.SheepListingWhereInput = {
            status: ListingStatus.APPROVED,
        };

        if (filter.animalType) where.animalType = filter.animalType;
        if (filter.regionId) where.regionId = filter.regionId;
        if (filter.districtId) where.districtId = filter.districtId;
        if (filter.breedId) where.breedId = filter.breedId;
        if (filter.purpose) where.purpose = filter.purpose;
        if (filter.gender) where.gender = filter.gender;

        if (filter.priceMin || filter.priceMax) {
            where.priceAmount = {};
            if (filter.priceMin) where.priceAmount.gte = filter.priceMin;
            if (filter.priceMax) where.priceAmount.lte = filter.priceMax;
        }

        if (filter.q) {
            const searchTerm = filter.q.trim();
            where.OR = [
                { title: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive' } },
            ];
        }

        const orderBy: Prisma.SheepListingOrderByWithRelationInput[] = [
            { isPaid: 'desc' },
            { isTop: 'desc' },
        ];
        switch (filter.sort) {
            case 'price_asc': orderBy.push({ priceAmount: 'asc' }); break;
            case 'price_desc': orderBy.push({ priceAmount: 'desc' }); break;
            case 'oldest': orderBy.push({ publishedAt: 'asc' }); break;
            case 'views': orderBy.push({ viewCount: 'desc' }); break;
            default: orderBy.push({ publishedAt: 'desc' });
        }

        const page = filter.page || 1;
        const limit = Math.min(filter.limit || 20, 50);
        const skip = (page - 1) * limit;

        const [listings, total] = await Promise.all([
            this.prisma.sheepListing.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    region: { select: { nameUz: true, slug: true } },
                    district: { select: { nameUz: true, slug: true } },
                    breed: { select: { name: true, slug: true } },
                    user: { select: { displayName: true, isVerified: true } },
                    media: {
                        select: { url: true, thumbUrl: true, type: true },
                        orderBy: { sortOrder: 'asc' },
                        take: 1,
                    },
                },
            }),
            this.prisma.sheepListing.count({ where }),
        ]);

        return {
            data: listings,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findBySlug(slug: string) {
        const listing = await this.prisma.sheepListing.findUnique({
            where: { slug },
            include: {
                region: true,
                district: true,
                breed: true,
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        telegramUsername: true,
                        phone: true,
                        isVerified: true,
                        avatarUrl: true,
                        createdAt: true,
                    },
                },
                media: { orderBy: { sortOrder: 'asc' } },
            },
        });

        if (!listing || listing.status !== ListingStatus.APPROVED) {
            throw new NotFoundException('Listing not found');
        }

        return listing;
    }

    async findById(id: string) {
        const listing = await this.prisma.sheepListing.findUnique({
            where: { id },
            include: {
                region: true,
                district: true,
                breed: true,
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        telegramUsername: true,
                        phone: true,
                        isVerified: true,
                        avatarUrl: true,
                        createdAt: true,
                    },
                },
                media: { orderBy: { sortOrder: 'asc' } },
            },
        });

        if (!listing || listing.status !== ListingStatus.APPROVED) {
            throw new NotFoundException('Listing not found');
        }

        return listing;
    }

    async getFeatured(limit = 20) {
        return this.prisma.sheepListing.findMany({
            where: { status: ListingStatus.APPROVED },
            orderBy: [{ isPaid: 'desc' }, { publishedAt: 'desc' }],
            take: limit,
            include: {
                region: { select: { nameUz: true, slug: true } },
                breed: { select: { name: true } },
                user: { select: { isVerified: true } },
                media: {
                    select: { url: true, thumbUrl: true, type: true },
                    orderBy: { sortOrder: 'asc' },
                    take: 1,
                },
            },
        });
    }

    async incrementViewCount(id: string) {
        await this.prisma.sheepListing.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        }).catch(() => {});
    }

    async createDraft(userId: string, dto: CreateSheepListingDto): Promise<SheepListing> {
        const baseSlug = slugify(dto.title, { lower: true, strict: true });
        const slug = `${baseSlug}-${uuidv4().substring(0, 8)}`;

        return this.prisma.sheepListing.create({
            data: {
                userId,
                title: dto.title,
                slug,
                description: dto.description,
                animalType: dto.animalType || 'QOY',
                regionId: dto.regionId,
                districtId: dto.districtId,
                purpose: dto.purpose,
                gender: dto.gender,
                breedId: dto.breedId,
                ageMonths: dto.ageMonths,
                priceAmount: dto.priceAmount,
                priceCurrency: dto.priceCurrency || 'UZS',
                hasVaccine: dto.hasVaccine,
                status: ListingStatus.DRAFT,
            },
        });
    }

    async updateDraft(userId: string, id: string, dto: UpdateSheepListingDto): Promise<SheepListing> {
        const listing = await this.prisma.sheepListing.findUnique({ where: { id } });

        if (!listing) throw new NotFoundException('Listing not found');
        if (listing.userId !== userId) throw new ForbiddenException('You can only edit your own listings');

        return this.prisma.sheepListing.update({
            where: { id },
            data: { ...dto, status: ListingStatus.DRAFT },
        });
    }

    async submitForReview(userId: string, id: string): Promise<SheepListing> {
        const listing = await this.prisma.sheepListing.findUnique({
            where: { id },
            include: { media: true },
        });

        if (!listing) throw new NotFoundException('Listing not found');
        if (listing.userId !== userId) throw new ForbiddenException('You can only submit your own listings');

        if (listing.status !== ListingStatus.DRAFT && listing.status !== ListingStatus.REJECTED) {
            throw new ForbiddenException('Listing already submitted');
        }

        if (!listing.title || !listing.regionId || !listing.priceAmount) {
            throw new ForbiddenException('Listing is incomplete');
        }

        if (listing.media.length === 0) {
            throw new ForbiddenException('Kamida bitta rasm yuklash kerak');
        }

        if (listing.isPaid) {
            // Already paid (re-submitting after edit) — no credit deduction
            await this.prisma.sheepListing.update({
                where: { id },
                data: {
                    status: ListingStatus.PENDING,
                    hasVideo: listing.media.some((m) => m.type === 'VIDEO'),
                },
            });
        } else {
            // First-time submission — check and deduct credit
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { listingCredits: true },
            });

            if (!user || user.listingCredits <= 0) {
                throw new HttpException(
                    { requiresPayment: true, listingId: id },
                    HttpStatus.PAYMENT_REQUIRED,
                );
            }

            // Decrement 1 credit and submit in transaction
            await this.prisma.$transaction([
                this.prisma.user.update({
                    where: { id: userId },
                    data: { listingCredits: { decrement: 1 } },
                }),
                this.prisma.sheepListing.update({
                    where: { id },
                    data: {
                        status: ListingStatus.PENDING,
                        isPaid: true,
                        hasVideo: listing.media.some((m) => m.type === 'VIDEO'),
                    },
                }),
            ]);
        }

        return this.prisma.sheepListing.findUnique({ where: { id } }) as Promise<SheepListing>;
    }

    async getMyListingById(userId: string, id: string) {
        const listing = await this.prisma.sheepListing.findUnique({
            where: { id },
            include: {
                region: true,
                district: true,
                breed: true,
                media: { orderBy: { sortOrder: 'asc' } },
            },
        });

        if (!listing) throw new NotFoundException('Listing not found');
        if (listing.userId !== userId) throw new ForbiddenException('You can only view your own listings');

        return listing;
    }

    async getMyListings(userId: string, status?: ListingStatus) {
        const where: Prisma.SheepListingWhereInput = { userId };
        if (status) where.status = status;

        return this.prisma.sheepListing.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            include: {
                region: { select: { nameUz: true } },
                media: {
                    select: { url: true, thumbUrl: true },
                    orderBy: { sortOrder: 'asc' },
                    take: 1,
                },
            },
        });
    }

    async archiveListing(userId: string, id: string, saleSource?: SaleSource): Promise<void> {
        const listing = await this.prisma.sheepListing.findUnique({ where: { id } });
        if (!listing) throw new NotFoundException('Listing not found');
        if (listing.userId !== userId) throw new ForbiddenException('You can only archive your own listings');

        await this.prisma.sheepListing.update({
            where: { id },
            data: {
                status: ListingStatus.ARCHIVED,
                ...(saleSource && { saleSource }),
            },
        });
    }

    async deleteListing(userId: string, id: string): Promise<void> {
        const listing = await this.prisma.sheepListing.findUnique({ where: { id } });
        if (!listing) throw new NotFoundException('Listing not found');
        if (listing.userId !== userId) throw new ForbiddenException('You can only delete your own listings');
        if (listing.status !== ListingStatus.ARCHIVED) {
            throw new ForbiddenException("Faqat nofaol (arxivlangan) e'lonni o'chirish mumkin");
        }

        await this.prisma.sheepListing.delete({ where: { id } });
    }
}
