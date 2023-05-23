import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MK')
    .setDescription('API MK')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'swaggerBearerAuth')
    .build();

  const options = {
    swaggerOptions: {
      authAction: {
        swaggerBearerAuth: {
          name: 'swaggerBearerAuth',
          schema: {
            description: 'Autenticação por token',
            type: 'apikey',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
