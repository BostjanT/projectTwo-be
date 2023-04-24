import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(30, { message: 'Password is too long' })
  password: string;
}
