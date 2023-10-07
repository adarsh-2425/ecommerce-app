import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from 'mongoose';
import { Product } from "src/product/schema/product.schema";
import { User } from "src/user/schema/user.schema";

@Schema({
    timestamps: true
})

export class Cart extends Document {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    user_id: Types.ObjectId;

    @Prop([
        {
            count: { type: Number, require: true },
            product_id: { type: SchemaTypes.ObjectId, ref: Product.name }
        },
    ])
    products: Array<{
        count: number;
        product_id: Types.ObjectId
    }>
}

export const CartSchmea = SchemaFactory.createForClass(Cart);