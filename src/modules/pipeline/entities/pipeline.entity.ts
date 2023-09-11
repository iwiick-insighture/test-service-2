import { PushWorkflowDto } from 'src/services/credential-svc/dtos/push-workflow.dto';
import { Trigger } from 'src/services/credential-svc/dtos/trigger.dto';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('pipeline')
export class Pipeline extends BaseEntity {
  constructor(dto: PushWorkflowDto) {
    super();
    if (!!dto) {
      this.id = `pipeline_${uuidv4()}`;
      this.pipeline_type = dto.pipelineType;
      this.app_id = dto.appId;
      this.target_env_id = dto.targetEnvId;
      this.credential_id = dto.credentialId;
      this.repository_name = dto.repositoryName;
      this.branch = dto.branch;
      this.workflow_name = dto.workflowName;
      this.file_name = dto.fileName;
      this.triggers = dto.triggers;
      this.steps = dto.steps;
    }
  }

  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column({
    type: 'varchar',
  })
  pipeline_type: string;

  @Column({
    type: 'varchar',
  })
  app_id: string;

  @Column({
    type: 'varchar',
  })
  target_env_id: string;

  @Column({
    type: 'varchar',
  })
  credential_id: string;

  @Column({
    type: 'varchar',
  })
  repository_name: string;

  @Column({
    type: 'varchar',
  })
  branch: string;

  @Column({
    type: 'varchar',
  })
  workflow_name: string;

  @Column({
    type: 'varchar',
  })
  file_name: string;

  @Column('jsonb', { default: [] })
  triggers: Trigger[];

  @Column('varchar', { array: true, default: [] })
  steps: string[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
