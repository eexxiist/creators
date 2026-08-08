import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    data: CreateCommentDto,
    recipeId: string,
    userId: string,
  ) {
    const findRecipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!findRecipe) {
      throw new NotFoundException('Рецепта нет');
    }

    const { content } = data;

    return this.prisma.comment.create({
      data: { content, recipeId, userId },
    });
  }

  async getAllComments(recipeId: string) {
    const findRecipe = this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!findRecipe) {
      throw new NotFoundException('Рецепта нет');
    }

    return this.prisma.comment.findMany({
      where: { recipeId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });
  }

  async deleteComment(commentId: string, userId: string, role: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { recipe: true },
    });

    if (!comment) {
      throw new NotFoundException('Комментария нет');
    }

    if (
      role === 'ADMIN' ||
      userId === comment.recipe.creatorId ||
      comment.userId === userId
    ) {
      return this.prisma.comment.delete({ where: { id: commentId } });
    }

    throw new ForbiddenException('Нет доступа');
  }
}
