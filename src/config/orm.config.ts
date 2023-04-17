import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Location } from 'src/entities/location.entity';
import { GuessLocation } from 'src/entities/guess.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Location, GuessLocation],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [],
  providers: []
})
export class TypeOrmConfig {}
