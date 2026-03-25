import { Controller, Get, Param, Query, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { SheepListingsService } from './sheep-listings.service';
import { SheepListingsFilterDto } from './dto/sheep-listing.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Sheep Listings')
@Controller('sheep-listings')
export class SheepListingsController {
    constructor(private readonly service: SheepListingsService) {}

    @Get()
    @Public()
    @ApiOperation({ summary: "Get all approved sheep/goat listings" })
    async findAll(@Query() filter: SheepListingsFilterDto) {
        const data = await this.service.findAll(filter);
        return { success: true, data, timestamp: new Date().toISOString() };
    }

    @Get('featured')
    @Public()
    async getFeatured(@Query('limit') limit?: number) {
        const data = await this.service.getFeatured(limit);
        return { success: true, data, timestamp: new Date().toISOString() };
    }

    @Get(':id')
    @Public()
    async findById(@Param('id') idOrSlug: string) {
        let listing = await this.service.findById(idOrSlug).catch(() => null);
        if (!listing) listing = await this.service.findBySlug(idOrSlug);
        return { success: true, data: listing, timestamp: new Date().toISOString() };
    }

    @Post(':id/view')
    @Public()
    async trackView(@Param('id') id: string, @Req() _req: Request) {
        this.service.incrementViewCount(id).catch(() => {});
        return { success: true, timestamp: new Date().toISOString() };
    }
}
