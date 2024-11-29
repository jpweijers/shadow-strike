import { Entity } from "../entities/entity";
import { Component } from "./component";

export class AttackComponent extends Component {
  constructor(
    public owner: Entity,
    public damage: number,
  ) {
    super();
  }
}
