import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
@Public()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all published products' })
    @ApiResponse({ status: 200, description: 'Returns paginated products' })
    async findAll(
        @Query('categoryId') categoryId?: string,
        @Query('priceMin') priceMin?: number,
        @Query('priceMax') priceMax?: number,
        @Query('hasDelivery') hasDelivery?: boolean,
        @Query('q') q?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.productsService.findAll({
            categoryId,
            priceMin,
            priceMax,
            hasDelivery,
            q,
            page,
            limit,
        });
    }

    @Get('categories')
    @ApiOperation({ summary: 'Get all product categories' })
    async getCategories() {
        return this.productsService.getCategories();
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Get product by slug' })
    @ApiResponse({ status: 200, description: 'Returns product details' })
    async findBySlug(@Param('slug') slug: string) {
        return this.productsService.findBySlug(slug);
    }
}
