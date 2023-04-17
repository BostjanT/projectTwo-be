import { IsLatitude, IsLongitude, IsUrl } from 'class-validator';

export class LocationInfo {
  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;

  @IsUrl()
  image: string;
}
