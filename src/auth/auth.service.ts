import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDoc } from 'src/user/user-entity/userSchema';
import { Model } from 'mongoose';
import {  TokenDto } from './login-dto/tokenDto';
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('userModel') private readonly userModel: Model<userDoc>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const isUser = await this.userModel.findOne({
      email: email,
      password: password,
    });

    if (isUser) {
      return isUser;
    }

    return null;
  }

  async loginUser(userData:TokenDto) {
    
    const accessToken =  this.jwtService.sign(userData, {
      secret: 'Hritik@11',
      expiresIn: '2m',
    });

    const refreshToken =  this.jwtService.sign(userData, {
      secret: 'Hritik@11',
      expiresIn: '5m',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: 'Hritik@11' });

      // issue a new access token
      const newAccessToken = this.jwtService.sign(
        { userId: payload.userId, role: payload.role },
        { secret: 'Hritik@11', expiresIn: '2m' },
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
