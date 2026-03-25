import { Module } from '@nestjs/common';
import { SheepListingsService } from './sheep-listings.service';
import { SheepListingsController } from './sheep-listings.controller';
import { MySheepListingsController } from './my-sheep-listings.controller';

@Module({
    controllers: [SheepListingsController, MySheepListingsController],
    providers: [SheepListingsService],
    exports: [SheepListingsService],
})
export class SheepListingsModule {}
