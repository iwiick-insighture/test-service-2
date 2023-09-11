import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { platform } from 'os';
import { HealthCheckDetail } from './dto/health.dto';
import { ApiResponseDto } from '../../common/dto/api-reponse.dto';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const pathBasedOnOs = platform().startsWith('win') ? 'C:\\' : '/';
    let meta = {};

    try {
      meta = await this.health.check([
        () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        () =>
          this.disk.checkStorage('storage', {
            thresholdPercent: 0.8,
            path: pathBasedOnOs,
          }),
      ]);
    } catch (error) {
      meta = {
        error: "Invalid path '/' in [checkStorage]",
      };
    } finally {
      return new ApiResponseDto<HealthCheckDetail>({
        data: new HealthCheckDetail('pipeline-svc is running', meta),
      });
    }
  }
}
