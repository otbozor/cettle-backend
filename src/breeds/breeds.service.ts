import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BreedsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.breed.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
    }

    async findBySlug(slug: string) {
        return this.prisma.breed.findUnique({
            where: { slug },
        });
    }

    async search(query: string) {
        return this.prisma.breed.findMany({
            where: {
                isActive: true,
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            orderBy: { name: 'asc' },
            take: 20,
        });
    }
}
