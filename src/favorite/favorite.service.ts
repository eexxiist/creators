import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}
  async addFavorite(recipeId: string, userId: string) {
    
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Такого рецепта нет');
    }

    const favorite = await this.prisma.favorite.findFirst({
      where: { recipeId, userId },
    });

    if (favorite) {
      throw new ConflictException('Рецепт уже в избранном');
    }

    return this.prisma.favorite.create({ data: { userId, recipeId } });
  }

  async deleteFavorite(recipeId: string, userId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { recipeId, userId },
    });

    if (!favorite) {
      throw new NotFoundException('Рецепт не был в избранном');
    }

    return this.prisma.favorite.delete({
      where: { userId_recipeId: { userId, recipeId } },
    });
  }

  async getFavorite(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      select: {
        recipe: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            creator: { select: { name: true } },
          },
        },
      },
    });
  }
}
