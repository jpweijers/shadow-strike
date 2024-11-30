import { Component } from "./component";

export class BoundaryComponent extends Component {
  constructor(
    private minX: number,
    private maxX: number,
    private minY: number,
    private maxY: number,
  ) {
    super();
  }

  isInBoundary(x: number, y: number): boolean {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}
