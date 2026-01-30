import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Regions')
@Controller('regions')
@Public()
export class RegionsController {
    constructor(private readonly regionsService: RegionsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all regions' })
    @ApiResponse({ status: 200, description: 'Returns all regions' })
    async findAll() {
        return this.regionsService.findAll();
    }

    @Get('with-districts')
    @ApiOperation({ summary: 'Get all regions with districts' })
    @ApiResponse({ status: 200, description: 'Returns all regions with their districts' })
    async findAllWithDistricts() {
        return this.regionsService.findAllWithDistricts();
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get region by slug with districts' })
    @ApiResponse({ status: 200, description: 'Returns region with districts' })
    async findBySlug(@Param('slug') slug: string) {
        return this.regionsService.findBySlug(slug);
    }

    @Get(':regionId/districts')
    @ApiOperation({ summary: 'Get districts by region ID' })
    @ApiResponse({ status: 200, description: 'Returns districts of the region' })
    async getDistricts(@Param('regionId') regionId: string) {
        return this.regionsService.getDistrictsByRegion(regionId);
    }
}
