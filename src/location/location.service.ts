import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Location } from 'src/entities/location.entity';
import { User } from 'src/entities/user.entity';
import { LocationInfo } from './dto/locationInfo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GuessLocation } from 'src/entities/guess.entity';

@Injectable()
export class LocationService {
  private logger = new Logger('LocationService');
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(GuessLocation)
    private readonly guessRepository: Repository<GuessLocation>,
    private userService: UserService
  ) {}

  //create and save location
  async createLocation(user: User, locationInfo: LocationInfo): Promise<Location> {
    const { latitude, longitude, image } = locationInfo;

    try {
      const location = new Location();

      location.latitude = latitude;
      location.longitude = longitude;
      location.image = image;
      location.timeCreated = new Date();
      location.user = user;

      await this.locationRepository.save(location);
      this.logger.verbose(`A new location has been added by user ${user.firstName} ${user.lastName}`);

      return location;
    } catch (error) {
      console.log(error);
    }
  }

  //get all locations
  async getLocations() {
    return await this.locationRepository.find();
  }

  //get single location by id
  async getSingleLocation(id: any): Promise<Location> {
    return await this.locationRepository.findOne({ where: { id } });
  }

  //edit location
  async editLocation(user: User, locationInfo: LocationInfo, id: string) {
    const { latitude, longitude, image } = locationInfo;
    const location = await this.locationRepository.findOne({ where: { id } });

    if (location.userId == user.id) {
      try {
        location.latitude = latitude;
        location.longitude = longitude;
        location.image = image;
        location.timeCreated = new Date();
        await this.locationRepository.save(location);
        this.logger.verbose(`User has successfully edited the location`);
      } catch (error) {
        return this.logger.error(`User ${user.firstName} ${user.lastName} doesn't have permission to edit location`);
      }
    }
  }

  //delete location
  async deleteLocation(user: User, id: string) {
    try {
      const location = await this.locationRepository.findOne({ where: { id } });
      if (location.userId === user.id) {
        await this.locationRepository.delete(location);
        this.logger.verbose(`User with email ${user.email} has deleted the location with the id ${id}`);
      }
    } catch (error) {
      this.logger.error(`User with email ${user.email} doesn't have the permission to delete location with the id ${id}`);
    }
  }

  //guess location
  async guessLocation(user: User, guessInfo: GuessLocation, id: string) {
    const { latitude, longitude } = guessInfo;
    const location = await this.locationRepository.findOne({ where: { id } });

    if (user.id === guessInfo.userId) {
      this.logger.error(`User ${user.firstName} ${user.lastName} has already guessed this location`);
    } else {
      const guess = new GuessLocation();
      guess.latitude = latitude;
      guess.longitude = longitude;
      guess.distance = this.calculateDistance(location.latitude, location.longitude, latitude, longitude);
      guess.timeCreated = new Date();
      guess.userId = user.id;
      guess.locationId = location.id;
      guess.locationImage = location.image;

      try {
        await this.guessRepository.save(guess);
        this.logger.verbose(`User ${user.firstName} ${user.lastName} has successfully guesses the location with id ${id}`);
      } catch (error) {
        return console.log(error);
      }
    }
  }

  //calculate distance between two points
  calculateDistance(lat1: any, lat2: any, long1: any, long2: any) {
    if (lat1 === lat2 && long1 === long2) {
      return 0;
    }

    const R = 6371;
    const calcLat1 = lat1 * (Math.PI / 180);
    const calcLat2 = lat2 * (Math.PI / 180);

    const latDiff = calcLat2 - calcLat1;
    const longDiff = (long2 - long1) * (Math.PI / 180);

    const distance = 2 * R * Math.asin(Math.sqrt(Math.sin(latDiff / 2) * Math.sin(latDiff / 2) + Math.cos(calcLat1) * Math.cos(calcLat2) * Math.sin(longDiff / 2) * Math.sin(longDiff / 2)));

    return distance;
  }
}
