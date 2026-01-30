import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { MyListingsController } from './my-listings.controller';

@Module({
    controllers: [ListingsController, MyListingsController],
    providers: [ListingsService],
    exports: [ListingsService],
})
export class ListingsModule { }
