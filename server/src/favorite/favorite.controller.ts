import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthRequest } from 'src/auth/types/auth-request';

@ApiBearerAuth()
@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  async addFavorite(
    @Param('id') recipeId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    return this.favoriteService.addFavorite(recipeId, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteFavorite(
    @Param('id') recipeId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    return this.favoriteService.deleteFavorite(recipeId, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getFavorite(@Req() request: AuthRequest) {
    const userId = request.user.id;
    return this.favoriteService.getFavorite(userId);
  }
}
