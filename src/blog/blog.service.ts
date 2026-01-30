import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogStatus, Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    async findAll(options?: {
        categoryId?: string;
        tagId?: string;
        q?: string;
        page?: number;
        limit?: number;
    }) {
        const where: Prisma.BlogPostWhereInput = {
            status: BlogStatus.PUBLISHED,
        };

        if (options?.categoryId) where.categoryId = options.categoryId;
        if (options?.q) {
            where.OR = [
                { title: { contains: options.q, mode: 'insensitive' } },
                { content: { contains: options.q, mode: 'insensitive' } },
            ];
        }

        const page = options?.page || 1;
        const limit = Math.min(options?.limit || 10, 50);
        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            this.prisma.blogPost.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                skip,
                take: limit,
                include: {
                    category: true,
                    tags: {
                        include: { tag: true },
                    },
                },
            }),
            this.prisma.blogPost.count({ where }),
        ]);

        return {
            data: posts,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async findBySlug(slug: string) {
        const post = await this.prisma.blogPost.findUnique({
            where: { slug },
            include: {
                category: true,
                tags: {
                    include: { tag: true },
                },
            },
        });

        if (!post || post.status !== BlogStatus.PUBLISHED) {
            throw new NotFoundException('Post not found');
        }

        return post;
    }

    async getCategories() {
        return this.prisma.blogCategory.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async getTags() {
        return this.prisma.blogTag.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async getRelatedPosts(slug: string, limit = 3) {
        const post = await this.prisma.blogPost.findUnique({
            where: { slug },
            select: { categoryId: true, id: true },
        });

        if (!post) return [];

        return this.prisma.blogPost.findMany({
            where: {
                id: { not: post.id },
                status: BlogStatus.PUBLISHED,
                categoryId: post.categoryId,
            },
            take: limit,
            orderBy: { publishedAt: 'desc' },
        });
    }
}
