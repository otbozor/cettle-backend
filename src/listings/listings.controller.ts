import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { ListingsService } from './listings.service';
import { ListingsFilterDto } from './dto/listing.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Listings')
@Controller('listings')
export class ListingsController {
    constructor(private readonly listingsService: ListingsService) { }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all approved listings with filters' })
    @ApiResponse({ status: 200, description: 'Returns paginated listings' })
    async findAll(@Query() filter: ListingsFilterDto) {
        return this.listingsService.findAll(filter);
    }

    @Get('featured')
    @Public()
    @ApiOperation({ summary: 'Get featured listings for homepage' })
    @ApiResponse({ status: 200, description: 'Returns featured listings' })
    async getFeatured(@Query('limit') limit?: number) {
        return this.listingsService.getFeatured(limit);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get listing by ID' })
    @ApiResponse({ status: 200, description: 'Returns listing details' })
    async findById(@Param('id') id: string, @Req() req: Request) {
        const listing = await this.listingsService.findById(id);

        // Track view asynchronously
        const user = req.user as User | undefined;
        const sessionId = req.cookies?.sessionId;
        this.listingsService.incrementViewCount(
            id,
            user?.id,
            sessionId,
            req.ip,
        ).catch(() => { });

        return listing;
    }

    @Get(':id/similar')
    @Public()
    @ApiOperation({ summary: 'Get similar listings' })
    @ApiResponse({ status: 200, description: 'Returns similar listings' })
    async findSimilar(@Param('id') id: string) {
        return this.listingsService.findSimilar(id);
    }

    @Post(':id/favorite')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Add listing to favorites' })
    @ApiResponse({ status: 201, description: 'Added to favorites' })
    async addToFavorites(
        @Param('id') id: string,
        @CurrentUser() user: User,
    ) {
        await this.listingsService.addToFavorites(user.id, id);
        return { success: true };
    }

    @Delete(':id/favorite')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Remove listing from favorites' })
    @ApiResponse({ status: 200, description: 'Removed from favorites' })
    async removeFromFavorites(
        @Param('id') id: string,
        @CurrentUser() user: User,
    ) {
        await this.listingsService.removeFromFavorites(user.id, id);
        return { success: true };
    }

    @Get(':id/is-favorite')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Check if listing is in favorites' })
    async isFavorite(
        @Param('id') id: string,
        @CurrentUser() user: User,
    ) {
        const isFav = await this.listingsService.isFavorite(user.id, id);
        return { isFavorite: isFav };
    }
}
