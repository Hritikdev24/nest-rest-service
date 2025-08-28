import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from '@nestjs/swagger';

@Schema({timestamps:true})
export class Order{

    @ApiProperty({ description: 'User ID who placed the order', example: '507f1f77bcf86cd799439011' })
    @Prop({required:true})
    userId:string;

    @ApiProperty({ description: 'Product name', example: 'Wireless Mouse' })
    @Prop({required:true})
    productName:string;

    @ApiProperty({ description: 'Quantity ordered', example: 2, type: Number })
    @Prop({required:true})
    quantity:number;

    @ApiProperty({ description: 'Creation timestamp', example: '2024-01-01T00:00:00.000Z', type: Date })
    createdAt?: Date;

    @ApiProperty({ description: 'Update timestamp', example: '2024-01-01T00:00:00.000Z', type: Date })
    updatedAt?: Date;
}

export const OrderSchema=SchemaFactory.createForClass(Order);

export type OrderDoc=Order & Document;