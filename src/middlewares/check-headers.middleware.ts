import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseDto } from 'src/common/dto/api-reponse.dto';
import { CustomHeaders } from 'src/common/dto/custom-headers.dto';

@Injectable()
export class CheckHeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const customHeaders = new CustomHeaders(req);

    if (!customHeaders.orgId || !customHeaders.traceId) {
      const response = new ApiResponseDto<any>({
        success: false,
        message: 'Organization ID and Trace ID cannot be empty !',
      });
      return res.status(400).json(response);
    }

    next();
  }
}
