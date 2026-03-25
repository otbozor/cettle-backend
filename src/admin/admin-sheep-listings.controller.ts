import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User, ListingStatus } from '@prisma/client';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    timestamp: string;
}

@ApiTags('Admin Sheep Listings')
@Controller('admin/sheep-listings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminSheepListingsController {
    constructor(private readonly adminService: AdminService) { }

    @Get()
    @ApiOperation({ summary: "Get all sheep listings with filters (admin)" })
    async getAdminSheepListings(
        @CurrentUser() user: User,
        @Query('status') status?: string,
        @Query('regionId') regionId?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.getAdminSheepListings({
            status: status as ListingStatus | undefined,
            regionId,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
        return {
            success: true,
            data,
            message: 'Sheep listings retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get sheep listing by ID (admin)' })
    async getSheepListingById(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.getAdminSheepListingById(id);
        return {
            success: true,
            data,
            message: 'Sheep listing retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Post(':id/approve')
    @ApiOperation({ summary: 'Approve a sheep listing' })
    async approveSheepListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.approveSheepListing(id, user.id);
        return {
            success: true,
            data,
            message: 'Sheep listing approved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Post(':id/reject')
    @ApiOperation({ summary: 'Reject a sheep listing' })
    async rejectSheepListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() body: { reason: string },
    ): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.rejectSheepListing(id, user.id, body.reason);
        return {
            success: true,
            data,
            message: 'Sheep listing rejected successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Delete(':id')
    @ApiOperation({ summary: "Qo'y e'lonini o'chirish (admin)" })
    async deleteSheepListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.deleteSheepListing(id, user.id);
        return {
            success: true,
            data,
            message: "E'lon muvaffaqiyatli o'chirildi",
            timestamp: new Date().toISOString(),
        };
    }
}
