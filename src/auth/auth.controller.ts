import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto/loginDto';
import { Body, Post } from '@nestjs/common';
import { Authenticate } from 'src/authenticate/authenticate.guard';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(Authenticate)
  @Post('login')
  login(@Req() req) {
    const { _id, role } = req.user;

    const tokens = this.authService.loginUser({ userId: _id, role: role });

    return tokens;
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
