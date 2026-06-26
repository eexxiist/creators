import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  avatarUrl: string;
  @IsString()
  @IsOptional()
  bio: string;
  @IsString()
  @IsOptional()
  instagram: string;
  @IsString()
  @IsOptional()
  telegram: string;
}
