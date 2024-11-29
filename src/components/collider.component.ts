import { Component } from "./component";

export class ColliderComponent extends Component {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
  ) {
    super();
  }

  isColliding(other: ColliderComponent): boolean {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.hypot(dy, dx);
    return distance < this.radius + other.radius;
  }
}
