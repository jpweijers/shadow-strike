import { Component } from "./component";

export type AIState = "idle" | "chasing" | "attacking" | "retreating" | "dead";

export class AIComponent extends Component {
  private state: AIState = "chasing";

  getState(): AIState {
    return this.state;
  }

  changeState(state: AIState): void {
    this.state = state;
  }
}
