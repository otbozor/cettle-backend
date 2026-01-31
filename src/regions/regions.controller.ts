import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { Public } from '../common/decorators/public.decorator';

// Response wrapper
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    timestamp: string;
}

@ApiTags('Regions')
@Controller('regions')
@Public()
export class RegionsController {
    constructor(private readonly regionsService: RegionsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all regions' })
    @ApiResponse({ status: 200, description: 'Returns all regions' })
    async findAll(): Promise<ApiResponse<any>> {
        const data = await this.regionsService.findAll();
        return {
            success: true,
            data,
            message: 'Regions retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('with-districts')
    @ApiOperation({ summary: 'Get all regions with districts' })
    @ApiResponse({ status: 200, description: 'Returns all regions with their districts' })
    async findAllWithDistricts(): Promise<ApiResponse<any>> {
        const data = await this.regionsService.findAllWithDistricts();
        return {
            success: true,
            data,
            message: 'Regions with districts retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get region by slug with districts' })
    @ApiResponse({ status: 200, description: 'Returns region with districts' })
    async findBySlug(@Param('slug') slug: string): Promise<ApiResponse<any>> {
        const data = await this.regionsService.findBySlug(slug);
        return {
            success: true,
            data,
            message: 'Region retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get(':regionId/districts')
    @ApiOperation({ summary: 'Get districts by region ID' })
    @ApiResponse({ status: 200, description: 'Returns districts of the region' })
    async getDistricts(@Param('regionId') regionId: string): Promise<ApiResponse<any>> {
        const data = await this.regionsService.getDistrictsByRegion(regionId);
        return {
            success: true,
            data,
            message: 'Districts retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }
}
