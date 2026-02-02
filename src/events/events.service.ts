import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async getUpcomingEvents(limit = 6) {
        const now = new Date();

        return this.prisma.event.findMany({
            where: {
                status: EventStatus.PUBLISHED,
                startsAt: {
                    gte: now,
                },
            },
            include: {
                region: {
                    select: {
                        nameUz: true,
                        slug: true,
                    },
                },
                district: {
                    select: {
                        nameUz: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                startsAt: 'asc',
            },
            take: limit,
        });
    }

    async getEventBySlug(slug: string) {
        const event = await this.prisma.event.findUnique({
            where: { slug },
            include: {
                region: {
                    select: {
                        nameUz: true,
                        slug: true,
                    },
                },
                district: {
                    select: {
                        nameUz: true,
                        slug: true,
                    },
                },
            },
        });

        if (event) {
            // Increment view count
            await this.prisma.event.update({
                where: { id: event.id },
                data: { viewCount: { increment: 1 } },
            });
        }

        return event;
    }

    async getAllEvents(filters?: {
        regionId?: string;
        status?: EventStatus;
        upcoming?: boolean;
    }) {
        const where: any = {};

        if (filters?.regionId) {
            where.regionId = filters.regionId;
        }

        if (filters?.status) {
            where.status = filters.status;
        } else {
            where.status = EventStatus.PUBLISHED;
        }

        if (filters?.upcoming) {
            where.startsAt = {
                gte: new Date(),
            };
        }

        return this.prisma.event.findMany({
            where,
            include: {
                region: {
                    select: {
                        nameUz: true,
                        slug: true,
                    },
                },
                district: {
                    select: {
                        nameUz: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                startsAt: 'asc',
            },
        });
    }

    async createEvent(data: any) {
        return this.prisma.event.create({
            data: {
                ...data,
                status: EventStatus.DRAFT,
            },
            include: {
                region: true,
                district: true,
            },
        });
    }

    async updateEvent(id: string, data: any) {
        return this.prisma.event.update({
            where: { id },
            data,
            include: {
                region: true,
                district: true,
            },
        });
    }

    async publishEvent(id: string) {
        return this.prisma.event.update({
            where: { id },
            data: {
                status: EventStatus.PUBLISHED,
                publishedAt: new Date(),
            },
        });
    }

    async deleteEvent(id: string) {
        return this.prisma.event.delete({
            where: { id },
        });
    }
}
