import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'User email address', 
    example: 'user@example.com',
    type: String 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'User password (minimum 6 characters)', 
    example: 'password123',
    minLength: 6,
    type: String 
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    description: 'User role', 
    example: 'user',
    type: String 
  })
  @IsNotEmpty({message:"role is required"})
  role:string;
}
