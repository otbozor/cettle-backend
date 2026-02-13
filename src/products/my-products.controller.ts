import {
    Controller,
    Get,
    Delete,
    Param,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

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
