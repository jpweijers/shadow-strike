import { Component } from "./component";

export type AIState = "idle" | "chasing" | "attacking" | "retreating" | "dead";

export class AIComponent extends Component {
  private state: AIState = "chasing";
  private timeSinceLastAttack = Infinity;
  private attackCooldown = 2;

  getState(): AIState {
    return this.state;
  }

  changeState(state: AIState): void {
    if (state === "attacking") {
      if (this.timeSinceLastAttack < this.attackCooldown) {
        // attack on cooldown
        return;
      }
      this.timeSinceLastAttack = 0;
    }
    this.state = state;
  }

  update(deltaTime: number): void {
    this.timeSinceLastAttack += deltaTime;
  }
}
