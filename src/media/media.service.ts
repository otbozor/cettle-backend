import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) { }

    // Generate signed URL for S3 upload (placeholder - implement with actual S3 SDK)
    async getSignedUploadUrl(
        entityType: 'listing' | 'product' | 'blog',
        contentType: string,
    ): Promise<{ uploadUrl: string; fileUrl: string; key: string }> {
        const bucket = this.configService.get<string>('S3_BUCKET');
        const endpoint = this.configService.get<string>('S3_ENDPOINT');

        const key = `${entityType}/${uuidv4()}`;
        const extension = contentType.split('/')[1] || 'jpg';
        const fullKey = `${key}.${extension}`;

        // In production, use @aws-sdk/client-s3 to generate presigned URL
        // For now, return placeholder
        const fileUrl = `${endpoint}/${bucket}/${fullKey}`;

        return {
            uploadUrl: `${endpoint}/${bucket}/${fullKey}?upload=true`, // Placeholder
            fileUrl,
            key: fullKey,
        };
    }

    async attachMediaToListing(
        listingId: string,
        media: Array<{ url: string; type: 'IMAGE' | 'VIDEO'; sortOrder: number; hash?: string }>,
    ) {
        // Delete existing media first
        await this.prisma.horseMedia.deleteMany({
            where: { listingId },
        });

        // Create new media entries
        return this.prisma.horseMedia.createMany({
            data: media.map((m, index) => ({
                listingId,
                url: m.url,
                type: m.type,
                sortOrder: m.sortOrder ?? index,
                hash: m.hash,
            })),
        });
    }

    async getListingMedia(listingId: string) {
        return this.prisma.horseMedia.findMany({
            where: { listingId },
            orderBy: { sortOrder: 'asc' },
        });
    }
}
