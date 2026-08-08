import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { generateJwt } from './utils/generateJwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async registration(data: { name: string; email: string; password: string }) {
    const { name, email, password } = data;
    if (!name || !email || !password) {
      throw new BadRequestException('Заполните все поля');
    }

    const findEmail = await this.prisma.user.findUnique({ where: { email } });
    if (findEmail) {
      throw new BadRequestException('Вы уже зарегистрированы');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, passwordHash },
    });

    const token = generateJwt(user.id, user.role);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    if (!email || !password) {
      throw new BadRequestException('Заполните все поля');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    const passwordInput = await bcrypt.compare(password, user.passwordHash);
    if (!passwordInput) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    const token = generateJwt(user.id, user.role);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
