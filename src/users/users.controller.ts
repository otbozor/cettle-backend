import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id/profile')
    @Public()
    @ApiOperation({ summary: 'Get public user profile' })
    @ApiResponse({ status: 200, description: 'Returns public user profile' })
    async getPublicProfile(@Param('id') id: string) {
        return this.usersService.getPublicProfile(id);
    }
}
