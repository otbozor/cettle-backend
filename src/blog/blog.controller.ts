import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Blog')
@Controller('blog')
@Public()
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get('posts')
    @ApiOperation({ summary: 'Get all published blog posts' })
    @ApiResponse({ status: 200, description: 'Returns paginated posts' })
    async findAll(
        @Query('categoryId') categoryId?: string,
        @Query('q') q?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.blogService.findAll({ categoryId, q, page, limit });
    }

    @Get('posts/:slug')
    @ApiOperation({ summary: 'Get blog post by slug' })
    @ApiResponse({ status: 200, description: 'Returns post details' })
    async findBySlug(@Param('slug') slug: string) {
        return this.blogService.findBySlug(slug);
    }

    @Get('posts/:slug/related')
    @ApiOperation({ summary: 'Get related posts' })
    @ApiResponse({ status: 200, description: 'Returns related posts' })
    async getRelated(@Param('slug') slug: string) {
        return this.blogService.getRelatedPosts(slug);
    }

    @Get('categories')
    @ApiOperation({ summary: 'Get all blog categories' })
    async getCategories() {
        return this.blogService.getCategories();
    }

    @Get('tags')
    @ApiOperation({ summary: 'Get all blog tags' })
    async getTags() {
        return this.blogService.getTags();
    }
}
