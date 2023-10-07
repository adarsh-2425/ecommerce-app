import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Product } from "src/product/schema/product.schema";
import { User } from "src/user/schema/user.schema";


@Schema({
    timestamps: true
})

export class Order {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    user_id: Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
    product_id: Types.ObjectId;

    @Prop()
    count: number;

    @Prop()
    price: number;

    @Prop()
    status: string;
}

export const order_schema = SchemaFactory.createForClass(Order)