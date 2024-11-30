import { AIComponent } from "../components/ai.component";
import { State, StateComponent } from "../components/state.component";
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

      if (state.getState() === "dead") {
        // change ai state to dead if entity died
        ai.changeState("dead");
      }

      switch (aiState) {
        case "idle":
          state.changeState("idle");
          break;
        case "chasing":
        case "retreating":
          state.changeState("walk");
          break;
        case "attacking":
          state.changeState(this.pickRandomAttack());
          break;
      }
    });
    return;
  }

  private pickRandomAttack(): State {
    const attacks = ["attack1", "attack2", "attack3"];
    return attacks[Math.floor(Math.random() * attacks.length)] as State;
  }
}
