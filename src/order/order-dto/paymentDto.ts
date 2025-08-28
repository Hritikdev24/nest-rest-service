import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentDto{
    @ApiPropertyOptional({ description: 'Optional cart ID to delete after payment', example: '65ac01b029b8411b6b2e6b91' })
    @IsOptional()
    cartId:string;

    @ApiPropertyOptional({ description: 'User ID (injected from auth)', example: '507f1f77bcf86cd799439011' })
    @IsOptional()
    userId:string;

    @ApiProperty({ description: 'Name on the card', example: 'John Doe' })
    @IsNotEmpty({message:"card holder name"})
    cardHolderName:string;

    @ApiProperty({ description: 'Card number', example: '4111111111111111' })
    @IsNotEmpty({message:"card number required"})
    cardNumber:string;
    
}