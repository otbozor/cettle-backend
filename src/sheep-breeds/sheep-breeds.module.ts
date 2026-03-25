import { Module } from '@nestjs/common';
import { SheepBreedsService } from './sheep-breeds.service';
import { SheepBreedsController } from './sheep-breeds.controller';

@Module({
    controllers: [SheepBreedsController],
    providers: [SheepBreedsService],
    exports: [SheepBreedsService],
})
export class SheepBreedsModule {}
