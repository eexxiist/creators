import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipe } from './dto/update-recipe.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecipeDto, creatorId: string) {
    const { categoryId } = data;
    const findCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (findCategory === null) {
      throw new NotFoundException('Категория не найдена');
    }

    const recipe = await this.prisma.recipe.create({
      data: { ...data, creatorId: creatorId },
    });

    return recipe;
  }

  async getRecipesAll(
    page: number,
    limit: number,
    search?: string,
    categoryId?: string,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.RecipeWhereInput = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    return this.prisma.recipe.findMany({
      where,
      skip,
      take: limit,
      include: {
        creator: { select: { name: true, id: true, avatarUrl: true } },
        category: true,
      },
    });
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        creator: { select: { name: true, id: true, avatarUrl: true } },
        category: true,
      },
    });

    if (!recipe) {
      throw new NotFoundException('Такого рецепта нет');
    }

    return recipe;
  }

  async updateRecipe(
    data: UpdateRecipe,
    recipeId: string,
    userId: string,
    role: string,
  ) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Такого рецепта нет');
    }

    if (role === 'ADMIN' || recipe.creatorId === userId) {
      return this.prisma.recipe.update({
        where: { id: recipeId },
        data: { ...data },
      });
    }
    throw new ForbiddenException('Нет доступа');
  }

  async delete(recipeId: string, userId: string, role: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Такого рецепта нет');
    }

    if (role === 'ADMIN' || recipe.creatorId === userId) {
      return this.prisma.recipe.delete({ where: { id: recipeId } });
    }

    throw new ForbiddenException('Нет доступа');
  }
}
