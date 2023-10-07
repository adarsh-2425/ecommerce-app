import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@Controller('api/cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Get()
    getCart(@GetUser() user) {
        return this.cartService.getCart(user)
    }


    @Post('/add')
    addToCart(@Body() dto, @GetUser() user) {
        return this.cartService.addToCart(dto, user)
    }

    @Post('/decrease')
    reduceQuantityInCart(@Body() dto, @GetUser() user) {
        return this.cartService.reduceQuantityInCart(dto, user);
    }



    

}
