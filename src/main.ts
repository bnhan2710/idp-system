import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
    defaultVersion: ['1'],
  })

  //config documentation
  const config = new DocumentBuilder()
    .setTitle('IDP System')
    .setDescription('IDP System API description')
    .setVersion('1.0')
    .addBearerAuth( {
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
    'access-token',)
    .addSecurityRequirements('access-token')
    .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

  await app.listen(PORT , ()=>{
    Logger.log(`Server is listening on PORT: ${PORT}`)
    })
}

bootstrap();
