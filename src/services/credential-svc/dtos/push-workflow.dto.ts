import { Trigger } from './trigger.dto';

export class PushWorkflowDto {
  readonly pipelineType: string;
  readonly appId: string;
  readonly targetEnvId: string;
  readonly credentialId: string;
  readonly repositoryName: string;
  readonly branch: string;
  readonly triggers: Trigger[];
  readonly steps: string[];
  readonly workflowName: string;
  readonly fileName: string;

  constructor(
    pipelineType: string,
    appId: string,
    targetEnvId: string,
    credentialId: string,
    repositoryName: string,
    branch: string,
    triggers: Trigger[],
    steps: string[],
    workflowName: string,
    fileName: string,
  ) {
    this.pipelineType = pipelineType;
    this.appId = appId;
    this.targetEnvId = targetEnvId;
    this.credentialId = credentialId;
    this.repositoryName = repositoryName;
    this.branch = branch;
    this.triggers = triggers;
    this.steps = Array.isArray(steps) ? steps : [];
    this.workflowName = workflowName;
    this.workflowName = fileName;
  }
}
