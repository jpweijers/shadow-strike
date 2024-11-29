import { AttackComponent } from "../components/attack.component";
import { ColliderComponent } from "../components/collider.component";
import { LifespanComponent } from "../components/lifespan.component";
import { PositionComponent } from "../components/position.component";
import { Entity } from "./entity";

export class AttackEntity extends Entity {
  constructor(
    x: number,
    y: number,
    radius: number,
    duration: number,
    owner: Entity,
    damage: number,
  ) {
    super();
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new ColliderComponent(x, y, radius));
    this.addComponent(new AttackComponent(owner, damage));
    this.addComponent(new LifespanComponent(duration));
  }
}
