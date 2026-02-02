import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BlogService } from '../blog/blog.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { AdminService } from './admin.service';

@ApiTags('Admin - Blog')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/blog')
export class AdminBlogController {
    constructor(
        private blogService: BlogService,
        private adminService: AdminService,
    ) { }

    @Get('posts')
    @ApiOperation({ summary: 'Get all blog posts (admin)' })
    async getAllPosts(
        @CurrentUser() user: User,
        @Query('status') status?: string,
        @Query('limit') limit?: string,
        @Query('page') page?: string,
    ) {
        await this.adminService.requireAdmin(user.id);

        const result = await this.blogService.getAllPostsForAdmin({
            status: status as any,
            limit: limit ? parseInt(limit) : 20,
            page: page ? parseInt(page) : 1,
        });

        return {
            success: true,
            data: result.data,
            pagination: result.pagination,
            message: 'Posts retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('posts/:id')
    @ApiOperation({ summary: 'Get blog post by ID (admin)' })
    async getPostById(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        await this.adminService.requireAdmin(user.id);

        const post = await this.blogService.getPostById(id);

        if (!post) {
            return {
                success: false,
                data: null,
                message: 'Post not found',
                timestamp: new Date().toISOString(),
            };
        }

        return {
            success: true,
            data: post,
            message: 'Post retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('posts')
    @ApiOperation({ summary: 'Create new blog post' })
    async createPost(
        @Body() body: {
            title: string;
            slug: string;
            excerpt?: string;
            content: string;
            coverImage?: string;
        },
        @CurrentUser() user: User,
    ) {
        await this.adminService.requireAdmin(user.id);

        const post = await this.blogService.createPost({
            ...body,
            authorId: user.id,
        });

        return {
            success: true,
            data: post,
            message: 'Post created successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Patch('posts/:id')
    @ApiOperation({ summary: 'Update blog post' })
    async updatePost(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() body: {
            title?: string;
            slug?: string;
            excerpt?: string;
            content?: string;
            coverImage?: string;
        },
    ) {
        await this.adminService.requireAdmin(user.id);

        const post = await this.blogService.updatePost(id, body);

        return {
            success: true,
            data: post,
            message: 'Post updated successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('posts/:id/publish')
    @ApiOperation({ summary: 'Publish blog post' })
    async publishPost(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        await this.adminService.requireAdmin(user.id);

        const post = await this.blogService.publishPost(id);

        return {
            success: true,
            data: post,
            message: 'Post published successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('posts/:id/archive')
    @ApiOperation({ summary: 'Archive blog post' })
    async archivePost(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        await this.adminService.requireAdmin(user.id);

        const post = await this.blogService.archivePost(id);

        return {
            success: true,
            data: post,
            message: 'Post archived successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Delete('posts/:id')
    @ApiOperation({ summary: 'Delete blog post' })
    async deletePost(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        await this.adminService.requireAdmin(user.id);

        await this.blogService.deletePost(id);

        return {
            success: true,
            data: null,
            message: 'Post deleted successfully',
            timestamp: new Date().toISOString(),
        };
    }
}
