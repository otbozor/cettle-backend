import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

// Response wrapper
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    timestamp: string;
}

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('dashboard/stats')
    @ApiOperation({ summary: 'Get admin dashboard stats' })
    async getDashboard(@CurrentUser() user: User): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.getDashboardStats();
        return {
            success: true,
            data,
            message: 'Dashboard stats retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('audit-logs')
    @ApiOperation({ summary: 'Get audit logs' })
    async getAuditLogs(
        @CurrentUser() user: User,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<ApiResponse<any>> {
        await this.adminService.requireAdmin(user.id);
        const data = await this.adminService.getAuditLogs(page, limit);
        return {
            success: true,
            data,
            message: 'Audit logs retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }
}
