import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/entities/location.entity';
import { GuessLocation } from 'src/entities/guess.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
  imports: [UserModule, TypeOrmModule.forFeature([Location, GuessLocation])]
})
export class LocationModule {}
