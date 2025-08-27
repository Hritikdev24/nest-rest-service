import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import { CreateUserDto } from './user-dto/userDto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
 
  @Post("register")
  userRegister(@Body() userData:CreateUserDto){
  return this.userService.register(userData);
  }

  @Get("/all-user")
  getAllUser(){
    return this.userService.getUsers()
  }


}
