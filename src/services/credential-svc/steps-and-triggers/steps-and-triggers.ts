import { Trigger } from '../dtos/trigger.dto';
import * as githubSteps from './github-steps.json';

export class StepsAndTriggersFactory {
  private githubStepsAndTriggers: GithubStepsAndTriggers;

  constructor() {
    this.githubStepsAndTriggers = new GithubStepsAndTriggers();
  }

  get(flavour: string) {
    switch (flavour) {
      case 'github':
        return this.githubStepsAndTriggers;

      default:
        throw new Error('Invalid flavour in Steps and Triggers Factory !');
    }
  }
}

interface StepsAndTriggers {
  readonly triggers: {};
  readonly steps: string[];
  readonly allSteps: Object;
  setTriggers(triggers: Trigger[]): void;
  setSteps(steps: string[]): void;
  getWorkflowObj(workflowName: string): Object;
}

class GithubStepsAndTriggers implements StepsAndTriggers {
  triggers = {};
  steps = [];
  allSteps = githubSteps;

  public setTriggers(triggers: Trigger[]) {
    let triggerObj = {};

    triggers.forEach((trigger) => {
      Object.assign(triggerObj, {
        [trigger.on]: {
          branches: trigger.branches,
        },
      });
    });

    this.triggers = triggerObj;
  }

  public setSteps(steps: string[]) {
    this.steps = [];
    //Load Defaults
    if (!steps || steps.length == 0) {
      this.steps = Object.values(this.allSteps);
    }
    // Load specific steps
    else {
      steps.forEach((step) => {
        if (this.allSteps[step]) {
          this.steps.push(this.allSteps[step]);
        }
      });
    }
  }

  getWorkflowObj(workflowName: string): Object {
    return {
      name: `${workflowName} (Skyu Generated)`,
      on: this.triggers,
      jobs: {
        build: {
          'runs-on': 'ubuntu-latest',
          steps: this.steps,
        },
      },
    };
  }
}
