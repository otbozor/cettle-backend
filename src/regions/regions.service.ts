import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.region.findMany({
            orderBy: { nameUz: 'asc' },
        });
    }

    async findBySlug(slug: string) {
        return this.prisma.region.findUnique({
            where: { slug },
            include: {
                districts: {
                    orderBy: { nameUz: 'asc' },
                },
            },
        });
    }

    async findAllWithDistricts() {
        return this.prisma.region.findMany({
            orderBy: { nameUz: 'asc' },
            include: {
                districts: {
                    orderBy: { nameUz: 'asc' },
                },
            },
        });
    }

    async getDistrictsByRegion(regionId: string) {
        return this.prisma.district.findMany({
            where: { regionId },
            orderBy: { nameUz: 'asc' },
        });
    }

    async getDistrictBySlug(slug: string) {
        return this.prisma.district.findUnique({
            where: { slug },
            include: {
                region: true,
            },
        });
    }
}
