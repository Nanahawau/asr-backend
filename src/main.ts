import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './response/response.interceptor';
import DefaultConfig from './config/default.config';
import { AuthenticationInterceptor } from './auth/interceptors/authentication.interceptor';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ASR Backend')
    .setDescription('ASR Backend for collecting audio data')
    .setVersion('1.0.0')
    .addTag('asr-backend')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configDependency = app.get(ConfigService);
  app.useGlobalInterceptors(new AuthenticationInterceptor(configDependency));

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
