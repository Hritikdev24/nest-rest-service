import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({timestamps:true})
export class Payment{

    @ApiPropertyOptional({ description: 'Cart ID if payment closes a cart', example: '65ac01b029b8411b6b2e6b91' })
    @Prop({required:false})
    cartId:string;

    @ApiPropertyOptional({ description: 'User ID paying', example: '507f1f77bcf86cd799439011' })
    @Prop()
    userId:string;

    @ApiProperty({ description: 'Name on the card', example: 'John Doe' })
    @Prop()
    cardHolderName:string;

    @ApiProperty({ description: 'Card number', example: '4111111111111111' })
    @Prop()
    cardNumber:string;

    @ApiProperty({ description: 'Creation timestamp', example: '2024-01-01T00:00:00.000Z', type: Date })
    createdAt?: Date;

    @ApiProperty({ description: 'Update timestamp', example: '2024-01-01T00:00:00.000Z', type: Date })
    updatedAt?: Date;
}

export const PaymentSchema=SchemaFactory.createForClass(Payment);

export type PaymentDoc=Payment & Document;