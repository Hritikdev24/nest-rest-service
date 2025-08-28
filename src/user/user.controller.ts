import { Body, Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import { CreateUserDto } from './user-dto/userDto';
import { Authorization } from 'src/authorization/authorization.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
 
  @Post("register")
  userRegister(@Body() userData:CreateUserDto){
  return this.userService.register(userData);
  }


 @UseGuards(Authorization)
  @Get("/all-user")
  getAllUser(){
    return this.userService.getUsers()
  }
  @UseGuards(Authorization)
  @Delete(":id")
  deleteUser(@Param('id') param:string){
  
    return this.userService.deleteUser(param)

  }


}
