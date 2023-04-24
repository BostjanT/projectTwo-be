import { IsString, IsEmail } from 'class-validator';
export class ChangeProfile {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}
