import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('dashboard/stats')
    @ApiOperation({ summary: 'Get admin dashboard stats' })
    async getDashboard(@CurrentUser() user: User) {
        await this.adminService.requirePermission(user.id, 'admin.access');
        return this.adminService.getDashboardStats();
    }

    @Get('audit-logs')
    @ApiOperation({ summary: 'Get audit logs' })
    async getAuditLogs(
        @CurrentUser() user: User,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        await this.adminService.requirePermission(user.id, 'admin.access');
        return this.adminService.getAuditLogs(page, limit);
    }
}
