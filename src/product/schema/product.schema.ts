import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from "src/user/schema/user.schema";

@Schema({
    timestamps: true
})

export class Product extends Document {

    @Prop({ ref: User.name, type: SchemaTypes.ObjectId })
    user_id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop({ default: 10 })
    quantity: number;

    @Prop()
    images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product)