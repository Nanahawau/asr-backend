import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response/response.interceptor';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import config from './config/default.config';
import { MongooseModule } from '@nestjs/mongoose';
import { DemographyModule } from './demography/demography.module';
import defaultConfig from './config/default.config';
import databaseConfig from './config/database.config';
import googleOauthConfig from './config/google-oauth.config';
import jwtConfig from './config/jwt.config';
import awsConfig from './config/aws.config';

@Module({
  imports: [
    AuthModule,
    MediaModule,
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        defaultConfig,
        googleOauthConfig,
        jwtConfig,
        awsConfig,
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => ({
        uri: dbConfig.url,
      }),
    }),
    DemographyModule,
  ], // TODO: Get DB details from config service
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
