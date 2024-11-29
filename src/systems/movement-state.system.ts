import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { StateComponent } from "../components/state.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class MovementStateSystem extends System {
  update(entities: Entity[]): void {
    const movementEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(AnimatedSpriteComponent) &&
        entity.hasComponent(VelocityComponent) &&
        entity.hasComponent(StateComponent)
      );
    });

    movementEntities.forEach((entity) => {
      const velocity = entity.getComponent(VelocityComponent);
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);
      const state = entity.getComponent(StateComponent);

      if (
        isNullOrUndefined(velocity) ||
        isNullOrUndefined(animatedSprite) ||
        isNullOrUndefined(state)
      ) {
        return;
      }

      if (velocity.dx !== 0 || velocity.dy !== 0) {
        state.changeState("walk");
        if (velocity.dx > 0) {
          animatedSprite.changeDirection("right");
        }
        if (velocity.dx < 0) {
          animatedSprite.changeDirection("left");
        }
        return;
      }

      if (state.isAttacking() && !animatedSprite.isDone()) {
        return;
      }

      state.changeState("idle");
    });
  }
}
