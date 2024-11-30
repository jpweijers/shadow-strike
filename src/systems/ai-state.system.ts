import { AIComponent } from "../components/ai.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class AIStateSystem extends System {
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const ai = entity.getComponent(AIComponent);
      const state = entity.getComponent(StateComponent);

      if (isNullOrUndefined(ai) || isNullOrUndefined(state)) {
        return;
      }

      const aiState = ai.getState();

      switch (aiState) {
        case "idle":
          state.changeState("idle");
          break;
        case "chasing":
        case "retreating":
          state.changeState("walk");
          break;
        case "attacking":
          state.changeState("attack1");
          break;
      }
    });
    return;
  }
}
