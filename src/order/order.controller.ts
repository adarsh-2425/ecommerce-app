import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('api/order')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post('/place-order')
    placeOrder(@Body() dto, @GetUser() user) {
        return this.orderService.placeOrder(dto, user)
    }

    // @Public()
    // @Post('/success')
    // async handlePaymentSuccess(@Body() body) {
    //     console.log(body)
    //     return this.orderService.handlePaymentSuccess(body);
    // }

}
