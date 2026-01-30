import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramBotService } from './telegram.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
    providers: [TelegramBotService],
    exports: [TelegramBotService],
})
export class TelegramModule { }
