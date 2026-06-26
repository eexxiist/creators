import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  ingredients: string[];
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
  @IsString()
  @IsOptional()
  videoUrl: string;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
