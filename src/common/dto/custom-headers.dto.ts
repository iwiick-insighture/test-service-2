import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { HEADERS } from '../constants/header.constant';

export class CustomHeaders {
  @ApiProperty()
  readonly orgId: string | null;

  @ApiProperty()
  readonly projId: string | null;

  @ApiProperty()
  readonly clusterId: string | null;

  @ApiProperty()
  readonly traceId: string | null;

  public constructor(req: Request) {
    this.orgId = req?.header(HEADERS.ORGANIZATION_ID);
    this.projId = req?.header(HEADERS.PROJECT_ID);
    this.clusterId = req?.header(HEADERS.CLUSTER_ID);
    this.traceId = req?.header(HEADERS.TRACE_ID);
  }

  getHeaderObj(): any {
    return {
      'x-organization-id': this.orgId,
      'x-project-id': this.projId,
      'x-cluster-id': this.clusterId,
      'x-trace-id': this.traceId,
    };
  }
}
