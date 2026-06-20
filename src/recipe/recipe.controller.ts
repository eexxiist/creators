import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import type { AuthRequest } from 'src/auth/types/auth-request';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRecipe } from './dto/update-recipe.dto';

@ApiBearerAuth()
@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'CREATOR')
  @Post()
  async create(@Body() data: CreateRecipeDto, @Req() request: AuthRequest) {
    const creatorId = request.user.id;

    return this.recipeService.create(data, creatorId);
  }

  @Get()
  async getRecipeAll() {
    return this.recipeService.getRecipesAll();
  }

  @Get(':id')
  async getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'CREATOR')
  @Patch(':id')
  async update(
    @Body() data: UpdateRecipe,
    @Param('id') recipeId: string,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    const role = request.user.role;
    return this.recipeService.updateRecipe(data, recipeId, userId, role);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'CREATOR')
  @Delete(':id')
  async delete(@Param('id') recipeId: string, @Req() request: AuthRequest) {
    const userId = request.user.id;
    const role = request.user.role;
    return this.recipeService.delete(recipeId, userId, role);
  }
}
