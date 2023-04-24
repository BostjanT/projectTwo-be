import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [AuthModule, UserModule, LocationModule, EmailModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {}
