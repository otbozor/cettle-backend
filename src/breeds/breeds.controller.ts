import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BreedsService } from './breeds.service';
import { Public } from '../common/decorators/public.decorator';

// Response wrapper
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    timestamp: string;
}

@ApiTags('Breeds')
@Controller('breeds')
@Public()
export class BreedsController {
    constructor(private readonly breedsService: BreedsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all active horse breeds' })
    @ApiResponse({ status: 200, description: 'Returns all active breeds' })
    async findAll(): Promise<ApiResponse<any>> {
        const data = await this.breedsService.findAll();
        return {
            success: true,
            data,
            message: 'Breeds retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('search')
    @ApiOperation({ summary: 'Search breeds by name' })
    @ApiQuery({ name: 'q', required: true, description: 'Search query' })
    @ApiResponse({ status: 200, description: 'Returns matching breeds' })
    async search(@Query('q') query: string): Promise<ApiResponse<any>> {
        const data = await this.breedsService.search(query || '');
        return {
            success: true,
            data,
            message: 'Breeds search completed successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get breed by slug' })
    @ApiResponse({ status: 200, description: 'Returns breed details' })
    async findBySlug(@Param('slug') slug: string): Promise<ApiResponse<any>> {
        const data = await this.breedsService.findBySlug(slug);
        return {
            success: true,
            data,
            message: 'Breed retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }
}
