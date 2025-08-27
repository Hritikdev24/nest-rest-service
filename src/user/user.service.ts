import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDoc } from './user-entity/userSchema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user-dto/userDto';
import { ConflictException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('userModel') private readonly userModel: Model<userDoc>,
  ) {}

  async register(createUserDto: CreateUserDto){
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Create and save user
    try {
      const user = await this.userModel.create({ email, password });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async getUsers(){
    return await this.userModel.find()
  }

  async deleteUser(param:string){

        try{
            const user=await this.userModel.findByIdAndDelete({_id:param})
            return user;
        }catch(err){
            throw new InternalServerErrorException(err);
        }

  }
}
