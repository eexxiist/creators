import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async addLike(recipeId: string, userId: string) {
    const findRecipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!findRecipe) {
      throw new NotFoundException('Рецепта нет');
    }

    const findLike = await this.prisma.like.findFirst({
      where: { recipeId, userId },
    });

    if (findLike) {
      throw new ConflictException('Лайк уже поставлен');
    }

    return this.prisma.like.create({ data: { recipeId, userId } });
  }

  async removeLike(recipeId: string, userId: string) {
    const findLike = await this.prisma.like.findFirst({
      where: { recipeId, userId },
    });

    if (!findLike) {
      throw new NotFoundException('Лайк не был поставлен');
    }

    return this.prisma.like.delete({
      where: { userId_recipeId: { recipeId, userId } },
    });
  }

  async getLikes(recipeId: string) {
    return this.prisma.like.count({
      where: { recipeId },
    });
  }
}
