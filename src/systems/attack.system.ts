import { PositionComponent } from "../components/position.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { Engine } from "../core/engine";
import { AttackEntity } from "../entities/attack.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { StateComponent } from "../components/state.component";

export class AttackSystem extends System {
  constructor(private engine: Engine) {
    super();
  }

  update(entities: Entity[], deltaTime: number) {
    const attackEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(PositionComponent) &&
        entity.hasComponent(AnimatedSpriteComponent) &&
        entity.hasComponent(StateComponent)
      );
    });

    attackEntities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);
      const state = entity.getComponent(StateComponent);

      if (
        isNullOrUndefined(position) ||
        isNullOrUndefined(animatedSprite) ||
        isNullOrUndefined(state)
      ) {
        return;
      }

      if (state.isAttacking() && state.canAttack()) {
        this.engine.addEntity(
          new AttackEntity(position.x, position.y, 50, 0.5, entity, 20),
        );
      }
      state.update(deltaTime);
    });
  }
}
