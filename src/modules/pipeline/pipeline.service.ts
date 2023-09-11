import { Injectable } from '@nestjs/common';
import { Pipeline } from './entities/pipeline.entity';
import { Repository } from 'typeorm';
import { CredentialSvcService } from 'src/services/credential-svc/credential-svc.service';
import { CustomHeaders } from 'src/common/dto/custom-headers.dto';
import { PushWorkflowDto } from 'src/services/credential-svc/dtos/push-workflow.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PipelineService {
  constructor(
    @InjectRepository(Pipeline)
    private pipelineRepository: Repository<Pipeline>,
    private credentialSvc: CredentialSvcService,
  ) {}

  async createPipeline(customHeaders: CustomHeaders, dto: PushWorkflowDto) {
    try {
      const res = await this.credentialSvc.createWorkflow(customHeaders, dto);
      const pipeline = new Pipeline(dto);
      await this.pipelineRepository.save(pipeline);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }
}
