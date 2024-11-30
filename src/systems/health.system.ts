import { System } from "./system";
import { Entity } from "../entities/entity";
import { HealthComponent } from "../components/health.component";
import { AIComponent } from "../components/ai.component";
import { StateComponent } from "../components/state.component";

export class HealthSystem extends System {
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const health = entity.getComponent(HealthComponent);
      const state = entity.getComponent(StateComponent);
      const aiState = entity.getComponent(AIComponent);

      if (health?.isDead()) {
        state?.changeState("dead");
        aiState?.changeState("dead");
      }
    });
  }
}
