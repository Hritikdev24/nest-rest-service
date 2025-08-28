import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  @ApiPropertyOptional({ description: 'User ID (injected from auth)', example: '507f1f77bcf86cd799439011' })
  @IsOptional()
  userId: string;

  @ApiProperty({ description: 'Product name', example: 'Wireless Mouse' })
  @IsNotEmpty({ message: 'productName is required' })
  productName: string;

  @ApiProperty({ description: 'Quantity of product', example: 2, type: Number })
  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;
}
