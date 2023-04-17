import { IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsUrl(undefined, { message: 'Enter valid url' })
  image: string;
}
