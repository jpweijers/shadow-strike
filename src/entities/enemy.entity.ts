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
  constructor() {
    super();
    const x = Math.floor(Math.random() * 1280);
    const y = Math.floor(Math.random() * (720 - 500) + 500);
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new VelocityComponent(0, 0, 1));
    this.addComponent(new AnimatedSpriteComponent(enemyAnimations()));
    this.addComponent(new StateComponent("idle"));
    this.addComponent(new ColliderComponent(700, 700, 20));
    this.addComponent(new HealthComponent(100, 100));
    this.addComponent(new AttackComponent(enemyAttacks()));
    this.addComponent(new AIComponent());
    this.addComponent(new BoundaryComponent(0, 1280, 500, 720));
  }
}
