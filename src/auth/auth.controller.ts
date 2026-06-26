import { AuthService } from './auth.service';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import type { AuthRequest } from './types/auth-request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('registration')
  async registration(@Body() data: RegistrationDto) {
    return this.authService.registration(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() request: AuthRequest) {
    let userId = request.user.id;
    return this.authService.profile(userId);
  }
}
