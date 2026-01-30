import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TelegramAuthDto {
    @ApiPropertyOptional({ description: 'URL to return after authentication' })
    @IsOptional()
    @IsString()
    returnUrl?: string;
}

export class TelegramCallbackDto {
    @ApiProperty({ description: 'Session ID from start auth' })
    @IsString()
    sessionId: string;

    @ApiProperty({ description: 'Telegram user ID' })
    @IsNumber()
    telegramUserId: number;

    @ApiPropertyOptional({ description: 'Telegram username' })
    @IsOptional()
    @IsString()
    telegramUsername?: string;

    @ApiPropertyOptional({ description: 'User display name' })
    @IsOptional()
    @IsString()
    displayName?: string;

    @ApiPropertyOptional({ description: 'Phone number (from contact share)' })
    @IsOptional()
    @IsString()
    phone?: string;
}

export class VerifyCodeDto {
    @ApiProperty({ description: 'One-time verification code' })
    @IsString()
    code: string;
}

export class AdminLoginDto {
    @ApiProperty({ description: 'Admin username', example: 'superadmin' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'Admin password', example: 'password123' })
    @IsString()
    password: string;
}
