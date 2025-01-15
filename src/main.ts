import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  const PORT = process.env.PORT

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useGlobalInterceptors(new TransformInterceptor(reflector))

  app.use(cookieParser())
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "credentials": true
    }
  )
  //config api version
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
      defaultVersion: ['1','2'],
  })

  await app.listen(PORT , ()=>{
    Logger.log(`Server is listening on PORT: ${PORT}`)
    })
}

bootstrap();
