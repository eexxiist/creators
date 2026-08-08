import { LikeService } from './like.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthRequest } from 'src/auth/types/auth-request';

@ApiBearerAuth()
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post(':recipeId')
  async addLike(
    @Req() request: AuthRequest,
    @Param('recipeId') recipeId: string,
  ) {
    const userId = request.user.id;

    return this.likeService.addLike(recipeId, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':recipeId')
  async removeLike(
    @Req() request: AuthRequest,
    @Param('recipeId') recipeId: string,
  ) {
    const userId = request.user.id;
    return this.likeService.removeLike(recipeId, userId);
  }

  @Get('recipe/:recipeId')
  async getAllLikes(@Param('recipeId') recipeId: string) {
    return this.likeService.getLikes(recipeId);
  }
}
