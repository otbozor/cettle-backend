import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ListingsService } from './listings.service';
import { CreateListingDto, UpdateListingDto } from './dto/listing.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User, ListingStatus } from '@prisma/client';

@ApiTags('My Listings')
@Controller('my/listings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MyListingsController {
    constructor(private readonly listingsService: ListingsService) { }

    @Get()
    @ApiOperation({ summary: 'Get my listings' })
    @ApiResponse({ status: 200, description: 'Returns user listings' })
    async getMyListings(
        @CurrentUser() user: User,
        @Query('status') status?: ListingStatus,
    ) {
        return this.listingsService.getMyListings(user.id, status);
    }

    @Get('favorites')
    @ApiOperation({ summary: 'Get my favorite listings' })
    @ApiResponse({ status: 200, description: 'Returns favorite listings' })
    async getFavorites(@CurrentUser() user: User) {
        return this.listingsService.getFavorites(user.id);
    }

    @Post()
    @ApiOperation({ summary: 'Create new draft listing' })
    @ApiResponse({ status: 201, description: 'Draft created' })
    async createDraft(
        @CurrentUser() user: User,
        @Body() dto: CreateListingDto,
    ) {
        return this.listingsService.createDraft(user.id, dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update draft listing' })
    @ApiResponse({ status: 200, description: 'Draft updated' })
    async updateDraft(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() dto: UpdateListingDto,
    ) {
        return this.listingsService.updateDraft(user.id, id, dto);
    }

    @Post(':id/submit')
    @ApiOperation({ summary: 'Submit listing for review' })
    @ApiResponse({ status: 200, description: 'Submitted for review' })
    async submitForReview(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        return this.listingsService.submitForReview(user.id, id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Archive listing' })
    @ApiResponse({ status: 200, description: 'Listing archived' })
    async archiveListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        await this.listingsService.archiveListing(user.id, id);
        return { success: true };
    }
}
