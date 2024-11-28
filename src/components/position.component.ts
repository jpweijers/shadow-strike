import { Component } from "./component";

export class PositionComponent extends Component {
  constructor(
    public x: number,
    public y: number,
  ) {
    super();
  }
}
