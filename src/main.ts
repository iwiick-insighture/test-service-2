import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Handler } from 'aws-lambda';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';

import { description, name, version } from '../package.json';

async function bootstrap() {
  const expressApp = require('express')();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  
  nestApp.useLogger(process.env.NODE_ENV !== 'production' ? ['debug'] : ['warn']);
  nestApp.useGlobalPipes(new ValidationPipe());
  nestApp.setGlobalPrefix('api/v1/pipeline');

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('docs', nestApp, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  nestApp.enableCors();

  await nestApp.init();

  const server = createServer(expressApp);

  // Export your Nest.js application as a handler function
  const lambdaHandler: Handler = (event, context) => {
    return proxy(server, event, context);
  };

  return lambdaHandler;
}

// Export your AWS Lambda handler
export const handler = bootstrap();
