import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { AttackComponent } from "../components/attack.component";
import { BoundaryComponent } from "../components/boundary.component";
import { ColliderComponent } from "../components/collider.component";
import { HealthComponent } from "../components/health.component";
import { InputComponent } from "../components/input.component";
import { PositionComponent } from "../components/position.component";
import { StateComponent } from "../components/state.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "./entity";

import { playerAnimations, playerAttacks } from "../config/player.config";

export class PlayerEntity extends Entity {
  constructor() {
    super();
    this.addComponent(new PositionComponent(500, 500));
    this.addComponent(new VelocityComponent(0, 0, 2));
    this.addComponent(new InputComponent());
    this.addComponent(new AnimatedSpriteComponent(playerAnimations()));
    this.addComponent(new StateComponent("idle"));
    this.addComponent(new HealthComponent(100, 100));
    this.addComponent(new ColliderComponent(500, 500, 20));
    this.addComponent(new BoundaryComponent(0, 1280, 500, 720));
    this.addComponent(new AttackComponent(playerAttacks()));
  }
}
