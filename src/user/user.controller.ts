import { Body, Controller, Delete, Get, Param, UseGuards,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import { CreateUserDto } from './user-dto/userDto';
import { Authorization } from 'src/authorization/authorization.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './user-entity/userSchema';
import { ApiResponseDto, ErrorResponseDto } from '../common/dto/api-response.dto';
import { RolesGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @Post("register")
  @ApiOperation({ summary: 'User registration', description: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User registered successfully',
    type: ApiResponseDto<User>
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - validation error',
    type: ErrorResponseDto
  })
  @ApiBody({ type: CreateUserDto })
  userRegister(@Body() userData:CreateUserDto){
  return this.userService.register(userData);
  }

 @UseGuards(Authorization,RolesGuard)
 @Role("admin")
  @Get("/all-user")
  @ApiOperation({ summary: 'Get all users', description: 'Retrieve all users (requires authorization)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Users retrieved successfully',
    type: ApiResponseDto<User[]>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - insufficient permissions',
    type: ErrorResponseDto
  })
  @ApiBearerAuth()
  getAllUser(@Req() req){


    return this.userService.getUsers()
  }

  @UseGuards(Authorization)
  @Delete(":id")
  @ApiOperation({ summary: 'Delete user', description: 'Delete a user by ID (requires authorization)' })
  @ApiResponse({ 
    status: 200, 
    description: 'User deleted successfully',
    type: ApiResponseDto<string>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Forbidden - insufficient permissions',
    type: ErrorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found',
    type: ErrorResponseDto
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBearerAuth()
  deleteUser(@Param('id') param:string){
    return this.userService.deleteUser(param)
  }
}
