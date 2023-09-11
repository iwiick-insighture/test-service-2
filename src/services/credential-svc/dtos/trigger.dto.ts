export class Trigger {
  readonly on: string;
  readonly branches: string[];

  constructor(on: string, branches: string[]) {
    this.on = on;
    this.branches = branches;
  }
}
