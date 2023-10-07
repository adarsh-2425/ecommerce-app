import { 
    IsString, 
    IsNumber, 
    IsNotEmpty,
    IsOptional
 } from "class-validator";

export class addProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    quantity: number;

    @IsNotEmpty()
    @IsOptional()
    images: string[];
}