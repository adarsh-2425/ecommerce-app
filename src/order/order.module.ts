import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, order_schema } from './schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { Cart, CartSchmea } from 'src/cart/schema/cart.schema';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: order_schema},
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchmea }
    ])
    
  ],
  controllers: [OrderController],
  providers: [OrderService, StripeService]
})
export class OrderModule {}
