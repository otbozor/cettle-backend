import {
    IsString,
    IsOptional,
    IsNumber,
    IsBoolean,
    IsEnum,
    IsUUID,
    Min,
    Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SheepPurpose, SheepGender, SheepType, Currency } from '@prisma/client';

export class CreateSheepListingDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ enum: SheepType, default: 'QOY' })
    @IsEnum(SheepType)
    animalType: SheepType;

    @ApiProperty({ description: 'Region ID' })
    @IsUUID()
    regionId: string;

    @ApiPropertyOptional({ description: 'District ID' })
    @IsOptional()
    @IsUUID()
    districtId?: string;

    @ApiPropertyOptional({ enum: SheepPurpose })
    @IsOptional()
    @IsEnum(SheepPurpose)
    purpose?: SheepPurpose;

    @ApiPropertyOptional({ enum: SheepGender })
    @IsOptional()
    @IsEnum(SheepGender)
    gender?: SheepGender;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    breedId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(240)
    ageMonths?: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    priceAmount: number;

    @ApiPropertyOptional({ enum: Currency, default: 'UZS' })
    @IsOptional()
    @IsEnum(Currency)
    priceCurrency?: Currency;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    hasVaccine?: boolean;
}

export class UpdateSheepListingDto extends CreateSheepListingDto {}

export class SheepListingsFilterDto {
    @ApiPropertyOptional({ enum: SheepType })
    @IsOptional()
    @IsEnum(SheepType)
    animalType?: SheepType;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    regionId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    districtId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    breedId?: string;

    @ApiPropertyOptional({ enum: SheepPurpose })
    @IsOptional()
    @IsEnum(SheepPurpose)
    purpose?: SheepPurpose;

    @ApiPropertyOptional({ enum: SheepGender })
    @IsOptional()
    @IsEnum(SheepGender)
    gender?: SheepGender;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceMin?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceMax?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    q?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'views';

    @ApiPropertyOptional({ default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({ default: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(50)
    limit?: number;
}
