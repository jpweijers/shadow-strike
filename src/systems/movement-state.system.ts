import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class MovementStateSystem extends System {
  update(entities: Entity[]): void {
    const movementEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(AnimatedSpriteComponent) &&
        entity.hasComponent(VelocityComponent)
      );
    });

    movementEntities.forEach((entity) => {
      const velocity = entity.getComponent(VelocityComponent);
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);

      if (velocity.dx !== 0 || velocity.dy !== 0) {
        animatedSprite.changeAnimation("walk");
        return;
      }
      if (animatedSprite.state.includes("attack") && !animatedSprite.isDone()) {
        return;
      }

      animatedSprite.changeAnimation("idle");
    });
  }
}
