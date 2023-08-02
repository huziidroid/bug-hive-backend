import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
}
