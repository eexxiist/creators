import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthRequest } from 'src/auth/types/auth-request';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';

@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  async CreateComment(
    @Body() data: CreateCommentDto,
    @Param('id') recipeId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    return this.commentService.createComment(data, recipeId, userId);
  }

  @Get('recipe/:recipeId')
  async getAllComments(@Param('recipeId') recipeId: string) {
    return this.commentService.getAllComments(recipeId);
  }

  @UseGuards(AuthGuard)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    const role = request.user.role;
    return this.commentService.deleteComment(commentId, userId, role);
  }
}
