import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '../common/decorators/public.decorator';

// Response wrapper
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    timestamp: string;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id/profile')
    @Public()
    @ApiOperation({ summary: 'Get public user profile' })
    @ApiResponse({ status: 200, description: 'Returns public user profile' })
    async getPublicProfile(@Param('id') id: string): Promise<ApiResponse<any>> {
        const data = await this.usersService.getPublicProfile(id);
        return {
            success: true,
            data,
            message: 'User profile retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }
}
