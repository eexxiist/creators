import { AuthService } from './auth.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('registration')
  async registration(@Body() data: any) {
    return this.authService.registration(data)
  }
}
