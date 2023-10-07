import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interface/product.interface';
import { addProductDto } from './dto/add.dto';
import { JwtPayload } from 'src/auth/strategies';
import { updateProductDto } from './dto/update.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    // View all products
    async getProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    // View One Product by id
    async getProductById(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    // Create a Product
    async addProduct(files:any, dto: addProductDto, user: JwtPayload): Promise<any> {
        
        // user_id retriving from user.sub
        const user_id = user.sub;      
        return await this.productModel.create({
            user_id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            quantity: dto.quantity,
            images: files[0].filename
        });
    }

    // Update a Product by Id
    async updateProduct(files: any, dto: updateProductDto, user: JwtPayload): Promise<any> {
        const user_id = user.sub;

        const product = await this.productModel.updateOne(
            {_id: dto.id},
            {
                $set: {
                    user_id,
                    name: dto.name,
                    description: dto.description,
                    images: files.filename,
                    quantity: dto.quantity,
                    price: dto.price
                },
            },
        );
        if (product.modifiedCount) {
            return { message: 'Updated' }
        } else {
            throw new ConflictException('Product not found')
        }
        
      }

    // Delete a Product by Id
    async deleteProduct(id: String): Promise<Product> {
        return this.productModel.findByIdAndDelete(id)
      }

    
}
