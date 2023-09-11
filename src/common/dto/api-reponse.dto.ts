import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty()
  readonly success: boolean = true;

  @ApiProperty()
  @Optional()
  readonly data: T | null;

  @ApiProperty()
  readonly message: string | null;

  public constructor(b: Partial<ApiResponseDto<T>> = {}) {
    Object.assign(this, b);
  }
}
