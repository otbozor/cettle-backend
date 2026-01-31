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

// Response DTOs
interface AuthResponse<T> {
    success: boolean;
    data?: T;
    message: string;
    timestamp: string;
}

interface AdminLoginResponse {
    user: {
        id: string;
        username: string;
        displayName: string;
        isVerified: boolean;
        isAdmin: boolean;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
    };
}

interface TelegramStartResponse {
    sessionId: string;
    botDeepLink: string;
    expiresIn: number;
}

interface TelegramCallbackResponse {
    success: boolean;
    code: string;
    expiresIn: number;
}

interface TokenRefreshResponse {
    tokens: {
        accessToken: string;
        refreshToken: string;
        expiresIn: string;
    };
}

interface UserMeResponse {
    id: string;
    username?: string;
    displayName: string;
    avatarUrl?: string;
    isVerified: boolean;
    phone?: string;
    isAdmin: boolean;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('admin/login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Admin login with username and password' })
    @ApiResponse({ status: 200, description: 'Admin successfully logged in' })
    @ApiResponse({ status: 401, description: 'Invalid credentials or admin access required' })
    async adminLogin(
        @Body() dto: AdminLoginDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponse<AdminLoginResponse>> {
        const tokens = await this.authService.adminLogin(dto);
        this.authService.setTokenCookies(res, tokens);
        
        const user = await this.authService.getUserByUsername(dto.username);
        
        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    displayName: user.displayName,
                    isVerified: user.isVerified,
                    isAdmin: user.isAdmin,
                },
                tokens: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    expiresIn: '15m',
                },
            },
            message: 'Admin login successful',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('telegram/start')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Start Telegram authentication flow' })
    @ApiResponse({ status: 200, description: 'Telegram auth session created' })
    async startTelegramAuth(
        @Body() dto: TelegramAuthDto,
    ): Promise<AuthResponse<TelegramStartResponse>> {
        const result = await this.authService.startTelegramAuth(dto);
        
        return {
            success: true,
            data: {
                sessionId: result.sessionId,
                botDeepLink: result.botDeepLink,
                expiresIn: 600, // 10 minutes in seconds
            },
            message: 'Telegram auth session created. Open the bot link to continue.',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('telegram/callback')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Telegram bot callback (internal use)' })
    @ApiResponse({ status: 200, description: 'Telegram callback processed' })
    async telegramCallback(
        @Body() dto: TelegramCallbackDto,
    ): Promise<AuthResponse<TelegramCallbackResponse>> {
        const result = await this.authService.handleTelegramCallback(dto);
        
        if (!result.success) {
            throw new UnauthorizedException(result.error || 'Telegram callback failed');
        }
        
        return {
            success: true,
            data: {
                success: true,
                code: result.code,
                expiresIn: 300, // 5 minutes in seconds
            },
            message: 'Telegram verification successful. Use the code to complete login.',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify one-time code and get tokens' })
    @ApiResponse({ status: 200, description: 'Code verified and tokens issued' })
    @ApiResponse({ status: 401, description: 'Invalid or expired code' })
    async verifyCode(
        @Body() dto: VerifyCodeDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponse<TokenRefreshResponse>> {
        if (!dto.code || dto.code.trim().length === 0) {
            throw new UnauthorizedException('Verification code is required');
        }

        const tokens = await this.authService.verifyCode(dto.code.trim());

        if (!tokens) {
            throw new UnauthorizedException('Invalid or expired verification code. Please start authentication again.');
        }

        this.authService.setTokenCookies(res, tokens);

        return {
            success: true,
            data: {
                tokens: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    expiresIn: '15m',
                },
            },
            message: 'Verification successful. You are now logged in.',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token using refresh token' })
    @ApiResponse({ status: 200, description: 'New tokens issued' })
    @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
    async refreshToken(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponse<TokenRefreshResponse>> {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found in cookies');
        }

        const tokens = await this.authService.refreshTokens(refreshToken);
        this.authService.setTokenCookies(res, tokens);

        return {
            success: true,
            data: {
                tokens: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    expiresIn: '15m',
                },
            },
            message: 'Access token refreshed successfully',
            timestamp: new Date().toISOString(),
        };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout and invalidate tokens' })
    @ApiResponse({ status: 200, description: 'Successfully logged out' })
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponse<null>> {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }

        this.authService.clearTokenCookies(res);

        return {
            success: true,
            message: 'Logged out successfully. All tokens have been invalidated.',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current authenticated user information' })
    @ApiResponse({ status: 200, description: 'Current user data retrieved' })
    @ApiResponse({ status: 401, description: 'Unauthorized - invalid or missing token' })
    async getMe(@CurrentUser() user: User): Promise<AuthResponse<UserMeResponse>> {
        return {
            success: true,
            data: {
                id: user.id,
                username: user.username || undefined,
                displayName: user.displayName,
                avatarUrl: user.avatarUrl || undefined,
                isVerified: user.isVerified,
                phone: user.phone ? `${user.phone.substring(0, 4)}****` : undefined,
                isAdmin: user.isAdmin,
            },
            message: 'User information retrieved successfully',
            timestamp: new Date().toISOString(),
        };
    }
}
