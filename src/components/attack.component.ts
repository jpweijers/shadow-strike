import { Entity } from "../entities/entity";
import { Component } from "./component";

export class AttackComponent extends Component {
  private _damagedEntities: Entity[] = [];

  get damagedEntities(): Entity[] {
    return this._damagedEntities;
  }

  constructor(
    public owner: Entity,
    public damage: number,
  ) {
    super();
  }

  addDamagedEntity(entity: Entity): void {
    this._damagedEntities.push(entity);
  }
}
