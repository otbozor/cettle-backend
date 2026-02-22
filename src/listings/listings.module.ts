import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { MyListingsController } from './my-listings.controller';
import { ListingsExpiryService } from './listings-expiry.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
    imports: [TelegramModule],
    controllers: [ListingsController, MyListingsController],
    providers: [ListingsService, ListingsExpiryService],
    exports: [ListingsService],
})
export class ListingsModule { }
