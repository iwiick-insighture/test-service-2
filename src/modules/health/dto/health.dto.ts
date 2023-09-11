import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckDetail {
  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly meta: object;

  constructor(message: string, meta: object) {
    this.message = message;
    this.meta = meta;
  }
}
