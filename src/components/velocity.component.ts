import { Component } from "./component";

export class VelocityComponent extends Component {
  constructor(
    public dx: number,
    public dy: number,
  ) {
    super();
  }
}
