import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ 
    description: 'User role', 
    example: 'user',
    type: String 
  })
  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @ApiProperty({ 
    description: 'User ID', 
    example: '507f1f77bcf86cd799439011',
    type: String 
  })
  @IsNotEmpty({ message: 'userId is required' })
  userId: string;

  @IsNotEmpty()
  email:string;
}
