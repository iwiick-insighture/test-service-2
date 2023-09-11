import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger/logger.service';
import { CustomHeaders } from 'src/common/dto/custom-headers.dto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log the request details with body size and traceId (if available)
    const { method, url, query, body, headers } = req;
    const customHeaders = new CustomHeaders(req);
    const traceId = customHeaders.traceId;

    // Log the request info using the Winston logger
    logger.debug('request recieved', {
      traceId,
      method,
      url,
      query,
      headers,
    });
    next();
  }
}
