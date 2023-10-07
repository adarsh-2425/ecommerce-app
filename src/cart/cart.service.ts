import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UpdateCart } from './interface/updatecart.interface';
import { addToCartDto } from './dtos/add.dto';
import { JwtPayload } from 'src/auth/strategies';
import { Cart } from './schema/cart.schema';
import { Product } from 'src/product/schema/product.schema';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
    constructor(
      @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
      @InjectModel(Product.name) private readonly productModel: Model<Product>
      ){}

    async getCart(user: JwtPayload) {
      const user_id = user.sub;

      const cartExists = await this.cartModel
        .findOne({ user_id })
        .populate('products.product_id', 'name price')
        .exec();


      if (!cartExists) {
        const cart = await this.cartModel.create({ user_id });
        return { products: cart.products, total_price: 0 }
      }

      const productsWithDetails = cartExists.products.map(cartItem => {
        if (cartItem.product_id) {
          const { name, price } = cartItem.product_id as any;
          return {
            name,
            price,
            count: cartItem.count,
            total_amount: price * cartItem.count as any
          }
        }
      })

      return productsWithDetails;    
    }

    async addToCart(dto: addToCartDto, user: JwtPayload): Promise<any> {
      const user_id = user.sub;
      const product = await this.productModel.findOne({ _id: dto.product_id });

      const userCart = await this.cartModel.findOne({ user_id })
      if (!userCart) {
        const newCart = new this.cartModel({
          user_id,
          products: [
            { product_id: new Types.ObjectId(dto.product_id), count: 1 }
          ]
        });
        return newCart.save();
      } else {
        const cartProduct = userCart.products.find(
          (product) => product.product_id.toString() === dto.product_id,
        );

        if (cartProduct) {
          if (cartProduct.count + 1 > product.quantity)
            throw new ConflictException(`Only ${product.quantity} left`)
        }

        const existingProductIndex = userCart.products.findIndex(
          (product) => product.product_id.toString() === dto.product_id
        )

        if (existingProductIndex === -1) {
          userCart.products.push({
            product_id: new Types.ObjectId(dto.product_id),
            count: 1
          })
        } else {
          userCart.products[existingProductIndex].count += 1
        }
        return userCart.save()
        }
      }

    async reduceQuantityInCart(dto: addToCartDto, user: JwtPayload): Promise<any> {
      const user_id = user.sub;
      const userCart = await this.cartModel.findOne({ user_id })

      if (!userCart) {
        throw new ConflictException('User does not have a cart')
      }

      const existingProductIndex = userCart.products.findIndex(
        product => product.product_id.toString() === dto.product_id
      )

      if (existingProductIndex === -1) {
        throw new ConflictException('Product not found in cart')
      }

      if (userCart.products[existingProductIndex].count > 1) {
        userCart.products[existingProductIndex].count -=1
      } else {
        userCart.products.splice(existingProductIndex, 1)
      }

      return userCart.save()
    }

    async removeProductFromCart(dto, user: JwtPayload): Promise<any> {
      const user_id = user.sub;
      const userCart= await this.cartModel.findOne({ user_id });

      if (!userCart) {
        throw new ConflictException('User does not have a cart');
      }
  
      const existingProductIndex = userCart.products.findIndex(
        (product) => product.product_id.toString() === dto.productId,
      );
  
      if (existingProductIndex === -1) {
        throw new ConflictException('Product not found in cart');
      }
  
      userCart.products.splice(existingProductIndex, 1);
  
      return userCart.save();

      }
    }
 
