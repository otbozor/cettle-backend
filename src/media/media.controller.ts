import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Media')
@Controller('media')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('signed-url')
    @ApiOperation({ summary: 'Get signed URL for file upload' })
    @ApiResponse({ status: 201, description: 'Returns upload URL and file URL' })
    async getSignedUrl(
        @Body() body: { entityType: 'listing' | 'product' | 'blog'; contentType: string },
    ) {
        return this.mediaService.getSignedUploadUrl(body.entityType, body.contentType);
    }

    @Post('attach')
    @ApiOperation({ summary: 'Attach uploaded media to listing' })
    @ApiResponse({ status: 201, description: 'Media attached' })
    async attachMedia(
        @Body() body: {
            listingId: string;
            media: Array<{ url: string; type: 'IMAGE' | 'VIDEO'; sortOrder: number }>;
        },
    ) {
        await this.mediaService.attachMediaToListing(body.listingId, body.media);
        return { success: true };
    }
}
