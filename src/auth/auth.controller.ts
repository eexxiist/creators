import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Headers,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('registration')
  async registration(@Body() data: any) {
    return this.authService.registration(data);
  }

  @Post('login')
  async login(@Body() data: any) {
    return this.authService.login(data);
  }

  @Get('profile')
  async profile(@Headers() headers: Record<string, string>) {
    const authorization = headers.authorization;

    if (!authorization) {
      throw new BadRequestException('Токен не найден');
    }

    const token = authorization.split(' ')[1];
    console.log('authorization:', authorization);
    console.log('token:', token);
    return this.authService.profile(token);
  }
}
