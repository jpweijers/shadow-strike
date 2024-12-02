import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { VelocityComponent } from "../components/velocity.component";
import { LifespanComponent } from "../components/lifespan.component";
import { ColliderComponent } from "../components/collider.component";
import { GameManager } from "../core/game-manager";

export class StateSystem extends System {
  update(entities: Entity[]): void {
    const gameManager = GameManager.getInstance();

    entities.forEach((entity) => {
      const state = entity.getComponent(StateComponent);
      if (!state) {
        return;
      }

      const animation = entity.getComponent(AnimatedSpriteComponent);
      const velocity = entity.getComponent(VelocityComponent);
      this.cleanup(entity, state, gameManager);
      this.updateAnimation(state, animation);
      this.updateMovement(state, animation, velocity);
    });
  }

  private updateAnimation(
    state: StateComponent,
    animation?: AnimatedSpriteComponent,
  ): void {
    if (animation) {
      animation.changeAnimation(state.getState(), state.getDirection());
    }
  }

  private updateMovement(
    state: StateComponent,
    animation?: AnimatedSpriteComponent,
    velocity?: VelocityComponent,
  ): void {
    if (!animation || !velocity) {
      return;
    }

    // change to walk if moving
    if (velocity.isMoving()) {
      state.changeState("walk", velocity.direction());
      return;
    }

    if (state.isAttacking() && !animation.isDone()) {
      return;
    }

    if (state.getState() === "dead") {
      return;
    }

    state.changeState("idle");
  }

  private cleanup(
    entity: Entity,
    state: StateComponent,
    gameManager: GameManager,
  ): void {
    if (state.getState() !== "dead" || entity.hasComponent(LifespanComponent)) {
      // only kill entities that are not already dead
      return;
    }

    entity.removeComponent(VelocityComponent);
    entity.removeComponent(ColliderComponent);
    entity.addComponent(new LifespanComponent(5));
    gameManager.killEnemy();
  }
}
