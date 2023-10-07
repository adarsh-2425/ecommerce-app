import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchmea } from './schema/cart.schema';
import { CartService } from './cart.service';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchmea },
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
