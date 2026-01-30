import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventStatus, Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async findAll(options?: {
        regionId?: string;
        districtId?: string;
        dateFrom?: Date;
        dateTo?: Date;
        sort?: 'upcoming' | 'latest';
        page?: number;
        limit?: number;
    }) {
        const where: Prisma.KopkariEventWhereInput = {
            status: EventStatus.PUBLISHED,
        };

        if (options?.regionId) where.regionId = options.regionId;
        if (options?.districtId) where.districtId = options.districtId;

        if (options?.dateFrom || options?.dateTo) {
            where.startsAt = {};
            if (options?.dateFrom) where.startsAt.gte = options.dateFrom;
            if (options?.dateTo) where.startsAt.lte = options.dateTo;
        }

        const page = options?.page || 1;
        const limit = Math.min(options?.limit || 10, 50);
        const skip = (page - 1) * limit;

        const orderBy: Prisma.KopkariEventOrderByWithRelationInput =
            options?.sort === 'latest' ? { createdAt: 'desc' } : { startsAt: 'asc' };

        const [events, total] = await Promise.all([
            this.prisma.kopkariEvent.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    region: { select: { nameUz: true, slug: true } },
                    district: { select: { nameUz: true, slug: true } },
                },
            }),
            this.prisma.kopkariEvent.count({ where }),
        ]);

        return {
            data: events,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async findBySlug(slug: string) {
        const event = await this.prisma.kopkariEvent.findUnique({
            where: { slug },
            include: {
                region: true,
                district: true,
                organizer: {
                    select: {
                        id: true,
                        displayName: true,
                        telegramUsername: true,
                        isVerified: true,
                    },
                },
            },
        });

        if (!event || event.status !== EventStatus.PUBLISHED) {
            throw new NotFoundException('Event not found');
        }

        return event;
    }

    async getUpcoming(limit = 6) {
        return this.prisma.kopkariEvent.findMany({
            where: {
                status: EventStatus.PUBLISHED,
                startsAt: { gte: new Date() },
            },
            orderBy: { startsAt: 'asc' },
            take: limit,
            include: {
                region: { select: { nameUz: true } },
                district: { select: { nameUz: true } },
            },
        });
    }
}
