import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getCreators() {
    return this.prisma.user.findMany({
      where: {
        role: 'CREATOR',
        recipes: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        recipes: {
          select: {
            id: true,
            imageUrl: true,
          },
          take: 3,
        },
      },
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
        instagram: true,
        telegram: true,
        recipes: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
        instagram: true,
        telegram: true,
      },
    });
  }
}
