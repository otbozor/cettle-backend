import {
    Controller,
    Post,
    Body,
    Res,
    Req,
    Get,
    HttpCode,
    HttpStatus,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { TelegramAuthDto, TelegramCallbackDto, VerifyCodeDto, AdminLoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('admin/login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Admin login with username/password (Super Admin only)' })
    @ApiResponse({ status: 200, description: 'Sets auth cookies and returns success' })
    async adminLogin(
        @Body() dto: AdminLoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.adminLogin(dto);
        this.authService.setTokenCookies(res, tokens);
        return { success: true };
    }


    @Post('telegram/start')
    @ApiOperation({ summary: 'Start Telegram authentication flow' })
    @ApiResponse({ status: 200, description: 'Returns bot deep link and session ID' })
    async startTelegramAuth(@Body() dto: TelegramAuthDto) {
        return this.authService.startTelegramAuth(dto);
    }

    @Post('telegram/callback')
    @ApiOperation({ summary: 'Callback from Telegram bot (internal use)' })
    @ApiResponse({ status: 200, description: 'Returns success status and one-time code' })
    async telegramCallback(@Body() dto: TelegramCallbackDto) {
        return this.authService.handleTelegramCallback(dto);
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify one-time code and get tokens' })
    @ApiResponse({ status: 200, description: 'Sets auth cookies and returns success' })
    async verifyCode(
        @Body() dto: VerifyCodeDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const tokens = await this.authService.verifyCode(dto.code);

        if (!tokens) {
            throw new UnauthorizedException('Invalid or expired code');
        }

        this.authService.setTokenCookies(res, tokens);

        return { success: true };
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Returns new tokens' })
    async refreshToken(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const tokens = await this.authService.refreshTokens(refreshToken);
        this.authService.setTokenCookies(res, tokens);

        return { success: true };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout and clear tokens' })
    @ApiResponse({ status: 200, description: 'Clears auth cookies' })
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }

        this.authService.clearTokenCookies(res);

        return { success: true };
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current authenticated user' })
    @ApiResponse({ status: 200, description: 'Returns current user data' })
    async getMe(@CurrentUser() user: User) {
        // Check if user has any admin roles
        const adminRoles = await this.authService.getUserAdminRoles(user.id);
        const isAdmin = adminRoles.length > 0;

        return {
            id: user.id,
            telegramUsername: user.telegramUsername,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            isVerified: user.isVerified,
            phone: user.phone ? `${user.phone.substring(0, 4)}****` : null,
            isAdmin,
        };
    }
}
