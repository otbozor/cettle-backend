import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ListingStatus, Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    // Check if user has admin permission
    async checkPermission(userId: string, permissionKey: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                adminRoles: {
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    include: { permission: true },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!user) return false;

        for (const userRole of user.adminRoles) {
            for (const rolePermission of userRole.role.permissions) {
                if (rolePermission.permission.key === permissionKey) {
                    return true;
                }
            }
        }

        return false;
    }

    async requirePermission(userId: string, permissionKey: string): Promise<void> {
        const hasPermission = await this.checkPermission(userId, permissionKey);
        if (!hasPermission) {
            throw new ForbiddenException(`Missing permission: ${permissionKey}`);
        }
    }

    // Dashboard stats
    async getDashboardStats() {
        const [
            pendingListings,
            approvedListings,
            totalUsers,
            todayViews,
        ] = await Promise.all([
            this.prisma.horseListing.count({ where: { status: ListingStatus.PENDING } }),
            this.prisma.horseListing.count({ where: { status: ListingStatus.APPROVED } }),
            this.prisma.user.count(),
            this.prisma.viewLog.count({
                where: {
                    createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
                },
            }),
        ]);

        return {
            pendingListings,
            approvedListings,
            totalUsers,
            todayViews,
        };
    }

    // Moderation queue
    async getPendingListings(page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        const [listings, total] = await Promise.all([
            this.prisma.horseListing.findMany({
                where: { status: ListingStatus.PENDING },
                orderBy: { createdAt: 'asc' },
                skip,
                take: limit,
                include: {
                    user: { select: { displayName: true, telegramUsername: true } },
                    region: { select: { nameUz: true } },
                    media: { take: 1 },
                },
            }),
            this.prisma.horseListing.count({ where: { status: ListingStatus.PENDING } }),
        ]);

        return {
            data: listings,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async approveListing(listingId: string, adminUserId: string) {
        await this.requirePermission(adminUserId, 'listings.approve');

        const listing = await this.prisma.horseListing.update({
            where: { id: listingId },
            data: {
                status: ListingStatus.APPROVED,
                publishedAt: new Date(),
            },
        });

        // Log action
        await this.createAuditLog(adminUserId, 'listing.approve', 'HorseListing', listingId);

        return listing;
    }

    async rejectListing(listingId: string, adminUserId: string, reason: string) {
        await this.requirePermission(adminUserId, 'listings.reject');

        const listing = await this.prisma.horseListing.update({
            where: { id: listingId },
            data: {
                status: ListingStatus.REJECTED,
                rejectReason: reason,
            },
        });

        // Log action
        await this.createAuditLog(adminUserId, 'listing.reject', 'HorseListing', listingId, { reason });

        return listing;
    }

    // Users management
    async getUsers(page = 1, limit = 20, status?: string) {
        const where: Prisma.UserWhereInput = {};
        if (status) where.status = status as any;

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    _count: { select: { listings: true } },
                    adminRoles: { include: { role: true } },
                },
            }),
            this.prisma.user.count({ where }),
        ]);

        return {
            data: users,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }

    async banUser(userId: string, adminUserId: string) {
        await this.requirePermission(adminUserId, 'users.ban');

        await this.prisma.user.update({
            where: { id: userId },
            data: { status: 'BANNED' },
        });

        await this.createAuditLog(adminUserId, 'user.ban', 'User', userId);
    }

    async unbanUser(userId: string, adminUserId: string) {
        await this.requirePermission(adminUserId, 'users.unban');

        await this.prisma.user.update({
            where: { id: userId },
            data: { status: 'ACTIVE' },
        });

        await this.createAuditLog(adminUserId, 'user.unban', 'User', userId);
    }

    // Audit log
    async createAuditLog(
        actorUserId: string,
        action: string,
        entityType: string,
        entityId: string,
        diffJson?: any,
    ) {
        await this.prisma.auditLog.create({
            data: {
                actorUserId,
                action,
                entityType,
                entityId,
                diffJson,
            },
        });
    }

    async getAuditLogs(page = 1, limit = 50) {
        const skip = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    actor: { select: { displayName: true } },
                },
            }),
            this.prisma.auditLog.count(),
        ]);

        return {
            data: logs,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }
}
