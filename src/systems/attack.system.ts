import { PositionComponent } from "../components/position.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { Engine } from "../core/engine";
import { AttackEntity } from "../entities/attack.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { StateComponent } from "../components/state.component";
import { AttackDamageComponent } from "../components/attack-damage.component";
import { LifespanComponent } from "../components/lifespan.component";
import { AttackComponent } from "../components/attack.component";
import type { AttackType } from "../components/attack.component";

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
    const state = entity.getComponent(StateComponent);

    if (isNullOrUndefined(position) || isNullOrUndefined(state)) {
      return;
    }

    if (state.isAttacking() && state.canAttack()) {
      console.log("Attacking");
      const attack = entity
        .getComponent(AttackComponent)
        ?.getAttack(state.getState() as AttackType);

      if (isNullOrUndefined(attack)) {
        return;
      }

      const direction = state.getDirection();
      const attackDirection = direction === "left" ? -1 : 1;

      this.engine.addEntity(
        new AttackEntity(
          position.x + attack.offsetX * attackDirection,
          position.y,
          attack.radius,
          1,
          entity,
          attack.damage,
        ),
      );
    }
    state.update(deltaTime);
  }

  private updateAttack(entity: Entity) {
    const attack = entity.getComponent(AttackDamageComponent);
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
