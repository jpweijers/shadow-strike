import { AIComponent } from "../components/ai.component";
import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { AttackComponent } from "../components/attack.component";
import { BoundaryComponent } from "../components/boundary.component";
import { ColliderComponent } from "../components/collider.component";
import { HealthComponent } from "../components/health.component";
import { PositionComponent } from "../components/position.component";
import { StateComponent } from "../components/state.component";
import { VelocityComponent } from "../components/velocity.component";
import { enemyAnimations, enemyAttacks } from "../config/enemy.config";
import { Entity } from "./entity";

export class EnemyEntity extends Entity {
  constructor(x: number, y: number) {
    super();
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new VelocityComponent(0, 0, 1));
    this.addComponent(new AnimatedSpriteComponent(enemyAnimations()));
    this.addComponent(new StateComponent("idle"));
    this.addComponent(new ColliderComponent(x, y, 20));
    this.addComponent(new HealthComponent(100, 100));
    this.addComponent(new AttackComponent(enemyAttacks()));
    this.addComponent(new AIComponent());
    this.addComponent(new BoundaryComponent(0, 1280, 500, 720));
  }
}
