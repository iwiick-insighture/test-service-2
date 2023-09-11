import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from 'src/common/dto/api-reponse.dto';
import { CustomHeaders } from 'src/common/dto/custom-headers.dto';
import { PushWorkflowDto } from 'src/services/credential-svc/dtos/push-workflow.dto';
import { PipelineService } from './pipeline.service';

@Controller()
export class PipelineController {
  constructor(private pipelineService: PipelineService) {}

  @Post('/create')
  async createPipeline(
    @Body() PushWorkflowObj: PushWorkflowDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customHeaders: CustomHeaders = new CustomHeaders(req);

    try {
      const responce = await this.pipelineService.createPipeline(
        customHeaders,
        PushWorkflowObj,
      );

      res.status(200).json(
        new ApiResponseDto<any>({
          data: responce,
        }),
      );
    } catch (error) {
      res.status(503).json(
        new ApiResponseDto<any>({
          success: false,
          message: error.message,
        }),
      );
    }
  }
}
