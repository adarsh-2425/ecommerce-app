import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class updateProductDto {
    @IsNotEmpty()
    @IsMongoId()
    id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsArray()
    images: string[]

}