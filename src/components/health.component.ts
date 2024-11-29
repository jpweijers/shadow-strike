import { Component } from "./component";

export class HealthComponent extends Component {
  constructor(
    public maxHealth: number,
    public currentHealth: number,
  ) {
    super();
  }

  get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  takeDamage(damage: number): void {
    this.currentHealth -= damage;
  }
}
