import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipe } from './dto/update-recipe.dto';

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

  async getRecipesAll() {
    return this.prisma.recipe.findMany({
      include: { creator: true, category: true },
    });
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { creator: true, category: true },
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
