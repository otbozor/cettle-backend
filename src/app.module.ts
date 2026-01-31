import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';
import { BreedsModule } from './breeds/breeds.module';
import { ListingsModule } from './listings/listings.module';
import { MediaModule } from './media/media.module';
import { AdminModule } from './admin/admin.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
    imports: [
        // Config
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Rate limiting
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // 1 minute
                limit: 100, // 100 requests per minute
            },
        ]),

        // Core modules
        PrismaModule,
        AuthModule,
        UsersModule,
        RegionsModule,
        BreedsModule,
        ListingsModule,
        MediaModule,
        AdminModule,

        // Telegram Bot
        TelegramModule,
    ],
})
export class AppModule { }
