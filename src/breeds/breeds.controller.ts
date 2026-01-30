import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BreedsService } from './breeds.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Breeds')
@Controller('breeds')
@Public()
export class BreedsController {
    constructor(private readonly breedsService: BreedsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all active horse breeds' })
    @ApiResponse({ status: 200, description: 'Returns all active breeds' })
    async findAll() {
        return this.breedsService.findAll();
    }

    @Get('search')
    @ApiOperation({ summary: 'Search breeds by name' })
    @ApiQuery({ name: 'q', required: true, description: 'Search query' })
    @ApiResponse({ status: 200, description: 'Returns matching breeds' })
    async search(@Query('q') query: string) {
        return this.breedsService.search(query || '');
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get breed by slug' })
    @ApiResponse({ status: 200, description: 'Returns breed details' })
    async findBySlug(@Param('slug') slug: string) {
        return this.breedsService.findBySlug(slug);
    }
}
