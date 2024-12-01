import { Component } from "./component";

export type AIState = "idle" | "chasing" | "attacking" | "retreating" | "dead";

export class AIComponent extends Component {
  private state: AIState = "chasing";
  private timeSinceLastAttack = Infinity;
  private attackCooldown = 2;
  private timeSinceLastStateChange = Infinity;
  private changeStateCooldown = 1;

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

    if (
      state !== "dead" &&
      this.timeSinceLastStateChange < this.changeStateCooldown
    ) {
      return;
    }

    this.state = state;
    this.timeSinceLastStateChange = 0;
  }

  update(deltaTime: number): void {
    this.timeSinceLastAttack += deltaTime;
    this.timeSinceLastStateChange += deltaTime;
  }
}
