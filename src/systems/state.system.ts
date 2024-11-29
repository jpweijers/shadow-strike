import { HealthComponent } from "../components/health.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { isDefined, isNullOrUndefined } from "../utils/helpers";

export class StateSystem extends System {
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const state = entity.getComponent(StateComponent);
      if (isNullOrUndefined(state)) {
        return;
      }

      const health = entity.getComponent(HealthComponent);

      if (isDefined(health) && health.isDead()) {
        state.changeState("dead");
      }
    });
  }
}
