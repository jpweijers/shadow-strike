import { Component } from "./component";

export type State = "idle" | "walk" | "attack1" | "attack2" | "attack3";

export class StateComponent extends Component {
  private attackCooldown: number = 0;

  constructor(private state: State) {
    super();
  }

  getState(): State {
    return this.state;
  }

  update(deltaTime: number): void {
    if (this.attackCooldown <= 0) {
      return;
    }
    this.attackCooldown -= deltaTime;
  }

  isAttacking(): boolean {
    return this.state.includes("attack");
  }

  changeState(state: State): void {
    if (state.includes("attack") && this.isAttacking()) {
      return;
    }
    if (this.state === state) {
      return;
    }
    this.state = state;
  }

  canAttack(): boolean {
    if (this.attackCooldown > 0) {
      return false;
    }
    this.attackCooldown = 0.5;
    return true;
  }
}
