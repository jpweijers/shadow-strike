import { Component } from "./component";

export class HealthComponent extends Component {
  constructor(
    public maxHealth: number,
    public currentHealth: number,
  ) {
    super();
  }

  isDead(): boolean {
    return this.currentHealth <= 0;
  }

  takeDamage(damage: number): void {
    this.currentHealth = Math.max(0, this.currentHealth - damage);
  }
}
