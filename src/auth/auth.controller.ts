import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto/loginDto';
import { Body, Post } from '@nestjs/common';
import { Authenticate } from 'src/authenticate/authenticate.guard';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginResponseDto, ErrorResponseDto } from '../common/dto/api-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(Authenticate)
  @Post('login')
  @ApiOperation({ summary: 'User login', description: 'Authenticate user and return JWT tokens' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful', 
    type: LoginResponseDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized', 
    type: ErrorResponseDto 
  })
  @ApiBearerAuth()
  login(@Req() req) {
    const { _id, role } = req.user;

    const tokens = this.authService.loginUser({ userId: _id, role: role });

    return tokens;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token', description: 'Get new access token using refresh token' })
  @ApiResponse({ 
    status: 200, 
    description: 'Token refreshed successfully', 
    type: LoginResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid refresh token', 
    type: ErrorResponseDto 
  })
  @ApiBody({ schema: { type: 'object', properties: { refreshToken: { type: 'string', description: 'Refresh token' } } } })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
