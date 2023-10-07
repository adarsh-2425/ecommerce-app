import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class placeOrderDto {
    
    @IsNotEmpty()
    @IsString()
    product_id: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number

}