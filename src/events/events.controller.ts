import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Events (Ko\'pkari)')
@Controller('events')
@Public()
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all published Ko\'pkari events' })
    @ApiResponse({ status: 200, description: 'Returns paginated events' })
    async findAll(
        @Query('regionId') regionId?: string,
        @Query('districtId') districtId?: string,
        @Query('dateFrom') dateFrom?: string,
        @Query('dateTo') dateTo?: string,
        @Query('sort') sort?: 'upcoming' | 'latest',
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.eventsService.findAll({
            regionId,
            districtId,
            dateFrom: dateFrom ? new Date(dateFrom) : undefined,
            dateTo: dateTo ? new Date(dateTo) : undefined,
            sort,
            page,
            limit,
        });
    }

    @Get('upcoming')
    @ApiOperation({ summary: 'Get upcoming events for homepage' })
    @ApiResponse({ status: 200, description: 'Returns upcoming events' })
    async getUpcoming(@Query('limit') limit?: number) {
        return this.eventsService.getUpcoming(limit);
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get event by slug' })
    @ApiResponse({ status: 200, description: 'Returns event details' })
    async findBySlug(@Param('slug') slug: string) {
        return this.eventsService.findBySlug(slug);
    }
}
