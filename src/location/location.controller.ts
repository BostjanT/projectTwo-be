import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from 'src/entities/location.entity';
import { AuthGuard } from '@nestjs/passport';
import { LocationInfo } from './dto/locationInfo.dto';
import { User } from 'src/entities/user.entity';
import { GuessLocation } from 'src/entities/guess.entity';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  // GET ALL LOCATIONS
  @Get()
  async getLocations(): Promise<Location[]> {
    return await this.locationService.getLocations();
  }

  //GET SINGLE LOCATION BY ID
  @Get('/:id')
  async getSingeLocation(@Param('id') id: string): Promise<Location> {
    return await this.locationService.getSingleLocation(id);
  }

  //CREATE LOCATION
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLocation(@Body() locationInfo: LocationInfo, user: User): Promise<Location> {
    return await this.locationService.createLocation(user, locationInfo);
  }

  // EDIT LOCATION
  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit/:id')
  async editLocation(user: User, @Body() locationInfo: LocationInfo, @Param('id') id: string): Promise<any> {
    return await this.locationService.editLocation(user, locationInfo, id);
  }

  //GUESS LOCATION
  @UseGuards(AuthGuard('jwt'))
  @Post('/guess/:id')
  async guessLocation(user: User, @Body() guessInfo: GuessLocation, @Param('id') id: string) {
    return await this.locationService.guessLocation(user, guessInfo, id);
  }

  //DELETE LOCATION
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteLocation(user: User, id: string) {
    return await this.locationService.deleteLocation(user, id);
  }
}
