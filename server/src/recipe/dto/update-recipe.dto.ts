import { IsOptional } from 'class-validator';

export class UpdateRecipe {
  @IsOptional()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  ingredients: string[];
  @IsOptional()
  imageUrl: string;
  @IsOptional()
  videoUrl: string;
  @IsOptional()
  categoryId: string;
}
