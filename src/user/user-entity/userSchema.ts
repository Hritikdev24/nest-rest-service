import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ 
    description: 'User email address', 
    example: 'user@example.com',
    type: String 
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ 
    description: 'User password (hashed)', 
    example: 'hashedPassword123',
    type: String 
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ 
    description: 'User role', 
    example: 'user',
    type: String 
  })
  @Prop()
  role: string;

  @ApiProperty({ 
    description: 'User creation timestamp', 
    example: '2024-01-01T00:00:00.000Z',
    type: Date 
  })
  createdAt?: Date;

  @ApiProperty({ 
    description: 'User last update timestamp', 
    example: '2024-01-01T00:00:00.000Z',
    type: Date 
  })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type userDoc= User & Document;