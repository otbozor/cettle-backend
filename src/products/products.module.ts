import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MyProductsController } from './my-products.controller';

@Module({
    controllers: [ProductsController, MyProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule { }
