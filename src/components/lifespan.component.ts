import { Component } from "./component";

export class LifespanComponent extends Component {
  private elapsedTime: number = 0;
  private expireAt: number = 0;

  constructor(ttl: number) {
    super();
    this.expireAt = ttl;
  }

  get isExpired(): boolean {
    return this.elapsedTime >= this.expireAt;
  }

  update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
  }

  expire(): void {
    this.elapsedTime = this.expireAt;
  }
}
