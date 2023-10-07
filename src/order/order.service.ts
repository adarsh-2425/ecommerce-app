import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Product } from 'src/product/schema/product.schema';
import { Model } from 'mongoose';
import { Cart } from 'src/cart/schema/cart.schema';
import { placeOrderDto } from './dto/create.dto';
import { JwtPayload } from 'src/auth/strategies';
const stripe = require('stripe')('sk_test_51NgIfeSEO7NjiusZ1PSCGKyDOKPV0IgRztKmEoOis0qyopSgPKFgKss6c5AcrkSgPYfdwhrNYgzIWJcA3dgX3h5I00Q2dsAjvs')
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<Order>,
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
        @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
        private readonly stripeService: StripeService
        ){}

    async placeOrder(dto: placeOrderDto, user: JwtPayload) {
        const stripe = this.stripeService.stripe;
        const user_id = user.sub;
        const product: any = await this.productModel
            .findOne({ _id: dto.product_id });

        
            if (product.quantity === 0 || product.quantity < 0) {
                throw new ConflictException('Out of stock')
            }

            if (product.quantity < dto.quantity)
                throw new ConflictException('Not enough quantity');

            const priceToUse = product.price;

            const totalPrice = priceToUse * dto.quantity;


        // Create a payment intent on Stripe
        
        const paymentIntent = await stripe.paymentIntents.create({
          amount: totalPrice * 100, // Amount in cents
          currency: 'inr', 
        });
  
        // Create an order with payment status set to false
        const order = await this.orderModel.create({
          user_id,
          order_date: new Date(),
          price: totalPrice,
          product_id: dto.product_id,
          count: dto.quantity,
          status: false,
        });
  
        return {
          orderId: order._id,
          clientSecret: paymentIntent.client_secret,
        };

            
    }
    // paymentIntentId
    // async handlePaymentSuccess(body) {
    //     console.log(body)
    //      const { paymentIntentId } = body;

    //     const paymentIntent = await this.stripe.retrievePaymentIntent(paymentIntentId);
    //     console.log(paymentIntent)
    //     if (paymentIntent.status === 'succeeded') {
    //         console.log('payment sucess')
    //     } else {
    //         console.log('failed')
    //     }

    //     return { success: true }
    // }

}
