import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SheepBreedsService } from './sheep-breeds.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Sheep Breeds')
@Controller('sheep-breeds')
@Public()
export class SheepBreedsController {
    constructor(private readonly service: SheepBreedsService) {}

    @Get()
    async findAll(@Query('animalType') animalType?: string) {
        const data = await this.service.findAll(animalType);
        return { success: true, data, timestamp: new Date().toISOString() };
    }

    @Get('search')
    async search(@Query('q') q: string, @Query('animalType') animalType?: string) {
        const data = await this.service.search(q || '', animalType);
        return { success: true, data, timestamp: new Date().toISOString() };
    }
}
