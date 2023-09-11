import { Module } from '@nestjs/common';
import { PipelineController } from './pipeline.controller';
import { CredentialSvcService } from 'src/services/credential-svc/credential-svc.service';
import { HttpModule } from '@nestjs/axios';
import { PipelineService } from './pipeline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipeline } from './entities/pipeline.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Pipeline])],
  providers: [CredentialSvcService, PipelineService],
  controllers: [PipelineController],
})
export class PipelineModule {}
