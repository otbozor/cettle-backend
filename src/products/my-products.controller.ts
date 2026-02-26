import {
    Controller,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UserCreateProductDto } from './dto/user-create-product.dto';

@ApiTags('My Products')
@Controller('my/products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MyProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Get my products' })
    @ApiResponse({ status: 200, description: 'Returns user products' })
    async getMyProducts(@CurrentUser() user: User) {
        const products = await this.productsService.getMyProducts(user.id);
        return {
            success: true,
            data: products,
        };
    }

    @Get('favorites')
    @ApiOperation({ summary: 'Get my favorite products' })
    @ApiResponse({ status: 200, description: 'Returns favorited products' })
    async getMyFavoriteProducts(@CurrentUser() user: User) {
        return this.productsService.getMyProductFavorites(user.id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update my product' })
    @ApiResponse({ status: 200, description: 'Product updated' })
    async updateProduct(
        @CurrentUser() user: User,
        @Param('id') id: string,
        @Body() dto: UserCreateProductDto,
    ) {
        return this.productsService.updateMyProduct(user.id, id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete my product' })
    @ApiResponse({ status: 200, description: 'Product deleted' })
    async deleteProduct(
        @CurrentUser() user: User,
        @Param('id') id: string,
    ) {
        await this.productsService.deleteProduct(user.id, id);
        return { success: true };
    }
}
