import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { LocationInfo } from './dto/locationInfo.dto';

@Injectable()
export class LocationService {
  private logger = new Logger('LocationService');
  constructor(private userService: UserService) {}

  //create location
  async createLocation(user: User, locationInfo: LocationInfo): Promise<Location> {
    const { latitude, longitude, image } = locationInfo;

    try {
      const location = new Location();

      location.latitude = latitude;
      location.longitude = longitude;
      location.image = image;
      location.timeCreated = new Date();
      location.user = user;

      return location;
    } catch (error) {
      console.log(error);
    }
  }

  //get all locations
  async getLocation(): Promise<Location[]> {
    try {
    } catch (error) {
      return error;
    }
  }
}
