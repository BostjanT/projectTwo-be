import { IsUrl } from 'class-validator';
export class ChangeUserImage {
  @IsUrl(undefined, { message: 'Enter valid url' })
  image: string;
}
