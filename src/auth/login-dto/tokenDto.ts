import { IsEmail, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @IsNotEmpty({ message: 'userId is required' })
  userId: string;
}
