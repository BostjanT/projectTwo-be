import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { configValidationSchema } from './config/schema.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    LocationModule,
    EmailModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
