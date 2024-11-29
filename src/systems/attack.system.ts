import { PositionComponent } from "../components/position.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { Engine } from "../core/engine";
import { AttackEntity } from "../entities/attack.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { StateComponent } from "../components/state.component";
import { AttackComponent } from "../components/attack.component";
import { LifespanComponent } from "../components/lifespan.component";

export class AttackSystem extends System {
  constructor(private engine: Engine) {
    super();
  }

  update(entities: Entity[], deltaTime: number) {
    entities.forEach((entity) => {
      this.createAttack(entity, deltaTime);
      this.updateAttack(entity);
    });
  }

  private createAttack(entity: Entity, deltaTime: number) {
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
        new AttackEntity(position.x, position.y, 50, 1, entity, 20),
      );
    }
    state.update(deltaTime);
  }

  private updateAttack(entity: Entity) {
    const attack = entity.getComponent(AttackComponent);
    const lifespan = entity.getComponent(LifespanComponent);

    if (isNullOrUndefined(attack) || isNullOrUndefined(lifespan)) {
      return;
    }

    const ownerState = attack.owner.getComponent(StateComponent);

    if (isNullOrUndefined(ownerState)) {
      return;
    }

    if (!ownerState.isAttacking()) {
      lifespan.expire();
    }
  }
}
