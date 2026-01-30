import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductStatus, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(options?: {
        categoryId?: string;
        priceMin?: number;
        priceMax?: number;
        hasDelivery?: boolean;
        q?: string;
        page?: number;
        limit?: number;
    }) {
        const where: Prisma.ProductWhereInput = {
            status: ProductStatus.PUBLISHED,
        };

        if (options?.categoryId) where.categoryId = options.categoryId;
        if (options?.hasDelivery !== undefined) where.hasDelivery = options.hasDelivery;
        if (options?.priceMin || options?.priceMax) {
            where.priceAmount = {};
            if (options?.priceMin) where.priceAmount.gte = options.priceMin;
            if (options?.priceMax) where.priceAmount.lte = options.priceMax;
        }
        if (options?.q) {
            where.OR = [
                { title: { contains: options.q, mode: 'insensitive' } },
                { description: { contains: options.q, mode: 'insensitive' } },
            ];
        }

        const page = options?.page || 1;
        const limit = Math.min(options?.limit || 12, 50);
        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    category: true,
                    media: {
                        orderBy: { sortOrder: 'asc' },
                        take: 1,
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);

        return {
            data: products,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async findBySlug(slug: string) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                media: {
                    orderBy: { sortOrder: 'asc' },
                },
            },
        });

        if (!product || product.status !== ProductStatus.PUBLISHED) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async getCategories() {
        return this.prisma.productCategory.findMany({
            orderBy: { name: 'asc' },
        });
    }
}
