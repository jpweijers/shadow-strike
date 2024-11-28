import { InputComponent } from "../components/input.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "./entity";

export class PlayerEntity extends Entity {
  constructor() {
    super("player");
    this.addComponent(new PositionComponent(0, 0));
    this.addComponent(new VelocityComponent(0, 0));
    this.addComponent(new InputComponent());
  }
}
