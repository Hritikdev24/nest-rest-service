import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
        @ApiProperty({ 
          description: 'User email address', 
          example: 'user@example.com',
          type: String 
        })
        @IsNotEmpty({message:"email required"})
        email:string;

        @ApiProperty({ 
          description: 'User password', 
          example: 'password123',
          type: String 
        })
        @IsNotEmpty({message:"password required"})
        password:string;
}