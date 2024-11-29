import { Component } from "./component";

export type Direction = "left" | "right";

export class VelocityComponent extends Component {
  constructor(
    public dx: number,
    public dy: number,
    public speed: number = 1,
  ) {
    super();
  }

  isMoving(): boolean {
    return this.dx !== 0 || this.dy !== 0;
  }

  direction(): Direction {
    if (this.dx >= 0) {
      return "right";
    }
    return "left";
  }
}
