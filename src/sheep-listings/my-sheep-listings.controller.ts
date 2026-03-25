import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SheepListingsService } from './sheep-listings.service';
import { CreateSheepListingDto, UpdateSheepListingDto } from './dto/sheep-listing.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User, ListingStatus, SaleSource } from '@prisma/client';

@ApiTags('My Sheep Listings')
@Controller('my/sheep-listings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MySheepListingsController {
    constructor(private readonly service: SheepListingsService) {}

    @Get()
    async getMyListings(@CurrentUser() user: User, @Query('status') status?: ListingStatus) {
        return this.service.getMyListings(user.id, status);
    }

    @Get(':id')
    async getMyListingById(@CurrentUser() user: User, @Param('id') id: string) {
        const listing = await this.service.getMyListingById(user.id, id);
        return { success: true, data: listing };
    }

    @Post()
    async createDraft(@CurrentUser() user: User, @Body() dto: CreateSheepListingDto) {
        const listing = await this.service.createDraft(user.id, dto);
        return { success: true, data: listing, message: 'Draft created successfully' };
    }

    @Patch(':id')
    async updateDraft(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: UpdateSheepListingDto) {
        const listing = await this.service.updateDraft(user.id, id, dto);
        return { success: true, data: listing, message: 'Draft updated successfully' };
    }

    @Post(':id/submit')
    async submitForReview(@CurrentUser() user: User, @Param('id') id: string) {
        const listing = await this.service.submitForReview(user.id, id);
        return { success: true, data: listing, message: 'Listing submitted for review' };
    }

    @Delete(':id')
    async archiveListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body('saleSource') saleSource?: SaleSource,
    ) {
        await this.service.archiveListing(user.id, id, saleSource);
        return { success: true };
    }

    @Delete(':id/permanent')
    async deleteListing(@CurrentUser() user: User, @Param('id') id: string) {
        await this.service.deleteListing(user.id, id);
        return { success: true };
    }
}
