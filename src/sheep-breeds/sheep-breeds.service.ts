import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SheepBreedsService {
    constructor(private prisma: PrismaService) {}

    async findAll(animalType?: string) {
        return this.prisma.sheepBreed.findMany({
            where: {
                isActive: true,
                ...(animalType ? { animalType } : {}),
            },
            orderBy: { name: 'asc' },
        });
    }

    async search(query: string, animalType?: string) {
        return this.prisma.sheepBreed.findMany({
            where: {
                isActive: true,
                name: { contains: query, mode: 'insensitive' },
                ...(animalType ? { animalType } : {}),
            },
            orderBy: { name: 'asc' },
            take: 20,
        });
    }
}
