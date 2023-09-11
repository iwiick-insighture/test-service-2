import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { PipelineModule } from './modules/pipeline/pipeline.module';

import {
  ExtractHeadersMiddleware,
  LoggerMiddleware,
} from '@skyu-io/skyu-utils';
import config from './configs';
import { DatabaseModule } from './configs/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    HealthModule,
    PipelineModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(ExtractHeadersMiddleware).exclude('health').forRoutes('*');
  }
}
