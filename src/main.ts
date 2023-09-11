import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { description, name, version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(process.env.NODE_ENV !== 'production' ? ['debug'] : ['warn']);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/pipeline');

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  app.enableCors();
  await app.listen(4001);
}
bootstrap();
