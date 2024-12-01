import { Component } from "./component";

export class BoundaryComponent extends Component {
  constructor(
    public readonly minX: number,
    public readonly maxX: number,
    public readonly minY: number,
    public readonly maxY: number,
  ) {
    super();
  }

  isInBoundary(x: number, y: number): boolean {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}
