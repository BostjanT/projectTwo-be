import { IsLatitude, IsLongitude } from 'class-validator';

export class GuessInfo {
  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;
}
