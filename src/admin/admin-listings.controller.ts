import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Admin Listings')
@Controller('admin/listings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminListingsController {
    constructor(private readonly adminService: AdminService) { }

    @Get('pending')
    @ApiOperation({ summary: 'Get pending listings for moderation' })
    async getPendingListings(
        @CurrentUser() user: User,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        await this.adminService.requirePermission(user.id, 'listings.view');
        return this.adminService.getPendingListings(page, limit);
    }

    @Post(':id/approve')
    @ApiOperation({ summary: 'Approve a listing' })
    async approveListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        return this.adminService.approveListing(id, user.id);
    }

    @Post(':id/reject')
    @ApiOperation({ summary: 'Reject a listing' })
    async rejectListing(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() body: { reason: string },
    ) {
        return this.adminService.rejectListing(id, user.id, body.reason);
    }
}
