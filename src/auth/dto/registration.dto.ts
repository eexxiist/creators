import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
