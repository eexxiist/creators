import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async createFollow(userId: string, creatorId: string) {
    if (userId === creatorId) {
      throw new BadRequestException('на себя нельзя подписаться');
    }

    const creator = await this.prisma.user.findUnique({
      where: { id: creatorId },
    });

    if (!creator) {
      throw new NotFoundException('Пользователь не существует');
    }

    if (creator.role !== Role.CREATOR) {
      throw new ForbiddenException('вы не можете подписаться');
    }

    const checkFollow = await this.prisma.follow.findFirst({
      where: { followingId: creatorId, followerId: userId },
    });

    if (checkFollow) {
      throw new ConflictException('вы уже подписаны');
    }

    return this.prisma.follow.create({
      data: { followerId: userId, followingId: creatorId },
    });
  }

  async deleteFollow(userId: string, creatorId: string) {
    if (userId === creatorId) {
      throw new BadRequestException('Нельзя отписаться от самого себя');
    }

    const creator = await this.prisma.user.findUnique({
      where: { id: creatorId },
    });

    if (!creator) {
      throw new NotFoundException('Пользователь не существует');
    }

    const checkFollow = await this.prisma.follow.findFirst({
      where: { followingId: creatorId, followerId: userId },
    });

    if (!checkFollow) {
      throw new NotFoundException('вы не были подписаны');
    }

    return this.prisma.follow.delete({
      where: {
        followerId_followingId: { followingId: creatorId, followerId: userId },
      },
    });
  }

  async getFollowCounts(userId: string) {
    const followingCount = await this.prisma.follow.count({
      where: { followingId: userId },
    });
    const followersCount = await this.prisma.follow.count({
      where: { followerId: userId },
    });

    return { followingCount, followersCount };
  }
}
