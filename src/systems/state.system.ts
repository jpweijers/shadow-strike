import { HealthComponent } from "../components/health.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { isDefined, isNullOrUndefined } from "../utils/helpers";
import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { VelocityComponent } from "../components/velocity.component";
import { LifespanComponent } from "../components/lifespan.component";

export class StateSystem extends System {
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const state = entity.getComponent(StateComponent);
      if (isNullOrUndefined(state)) {
        return;
      }

      const health = entity.getComponent(HealthComponent);
      this.updateHealth(entity, state, health);

      const animation = entity.getComponent(AnimatedSpriteComponent);
      const velocity = entity.getComponent(VelocityComponent);
      this.updateAnimation(state, animation);
      this.updateMovement(state, animation, velocity);
    });
  }

  private updateAnimation(
    state: StateComponent,
    animation?: AnimatedSpriteComponent,
  ) {
    if (isDefined(animation)) {
      animation.changeAnimation(state.getState(), state.getDirection());
    }
  }

  private updateMovement(
    state: StateComponent,
    animation?: AnimatedSpriteComponent,
    velocity?: VelocityComponent,
  ) {
    if (isNullOrUndefined(animation) || isNullOrUndefined(velocity)) {
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

  private updateHealth(
    entity: Entity,
    state: StateComponent,
    health?: HealthComponent,
  ) {
    if (isNullOrUndefined(health)) {
      return;
    }
    if (health.isDead() && state.getState() !== "dead") {
      state.changeState("dead");
      entity.addComponent(new LifespanComponent(5));
    }
  }
}
