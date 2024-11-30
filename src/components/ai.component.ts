import { Component } from "./component";

export type AIState = "idle" | "chasing" | "attacking" | "retreating" | "dead";

export class AIComponent extends Component {
  private state: AIState = "chasing";

  constructor() {
    super();
  }

  getState(): AIState {
    return this.state;
  }

  changeState(state: AIState) {
    this.state = state;
  }
}
