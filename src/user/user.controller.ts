import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
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

  @Delete(":id")
  deleteUser(@Param('id') param:string){
  
    return this.userService.deleteUser(param)

  }


}
