import { Component } from "./component";
import type { Direction } from "./velocity.component";

export type State =
  | "idle"
  | "walk"
  | "attack1"
  | "attack2"
  | "attack3"
  | "dead";

export class StateComponent extends Component {
  private attackCooldown: number = 0;

  constructor(
    private state: State,
    private direction: Direction = "right",
  ) {
    super();
  }

  getDirection(): Direction {
    return this.direction;
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

  changeState(state: State, direction: Direction = this.direction): void {
    if (state.includes("attack") && this.isAttacking()) {
      return;
    }
    if (this.state === state && this.direction === direction) {
      return;
    }
    this.state = state;
    this.direction = direction;
  }

  canAttack(): boolean {
    if (this.attackCooldown > 0) {
      return false;
    }
    this.attackCooldown = 0.5;
    return true;
  }
}
