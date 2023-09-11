import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { CustomHeaders } from 'src/common/dto/custom-headers.dto';
import { PushWorkflowDto } from './dtos/push-workflow.dto';
import * as jsYaml from 'js-yaml';
import { StepsAndTriggersFactory } from './steps-and-triggers/steps-and-triggers';

@Injectable()
export class CredentialSvcService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async createWorkflow(
    customHeaders: CustomHeaders,
    dto: PushWorkflowDto,
  ): Promise<any> {
    const baseUrl = this.configService.get<string>('credential.baseUrl');
    const {
      pipelineType,
      credentialId,
      repositoryName,
      branch,
      triggers,
      steps,
      workflowName,
      fileName,
    } = dto;

    const factory = new StepsAndTriggersFactory();

    try {
      const stepsAndTriggers = factory.get(pipelineType);
      stepsAndTriggers.setTriggers(triggers);
      stepsAndTriggers.setSteps(steps);

      const workflowContent = jsYaml.dump(
        stepsAndTriggers.getWorkflowObj(workflowName),
      );
      const encodedContent = Buffer.from(workflowContent).toString('base64');

      const requestPayload = {
        credentialId,
        repositoryName,
        branch,
        content: encodedContent,
        commitMessage: `'${fileName}' workflow file created'`,
        path: `.github/workflows/${fileName}.yaml`,
      };

      const headers = customHeaders.getHeaderObj();
      const serviceUrl = `${baseUrl}/vcs/repositories/${repositoryName}/branches/${branch}/contents`;

      const observable = this.httpService
        .post(`${serviceUrl}`, requestPayload, { headers })
        .pipe(
          map((res) => {
            return res;
          }),
        )
        .pipe(
          catchError((err) => {
            throw err;
          }),
        );
      return firstValueFrom(observable);
    } catch (err) {
      throw err;
    }
  }
}
