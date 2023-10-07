import { IsNotEmpty, IsString } from "class-validator";

export class addToCartDto {
    @IsNotEmpty()
    @IsString()
    product_id: string;
}