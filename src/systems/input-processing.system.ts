import { VelocityComponent } from "../components/velocity.component";
import { InputComponent } from "../components/input.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { isNullOrUndefined } from "../utils/helpers";
import { StateComponent } from "../components/state.component";

export class InputProcessingSystem extends System {
  update(entities: Entity[]): void {
    const inputEntities = entities.filter(
      (entity) =>
        entity.hasComponent(InputComponent) &&
        entity.hasComponent(VelocityComponent) &&
        entity.hasComponent(StateComponent),
    );

    inputEntities.forEach((entity) => {
      const input = entity.getComponent(InputComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const state = entity.getComponent(StateComponent);

      if (
        isNullOrUndefined(input) ||
        isNullOrUndefined(velocity) ||
        isNullOrUndefined(state)
      ) {
        return;
      }

      velocity.dx = 0;
      velocity.dy = 0;

      const lastKey = input.getLastKey();

      switch (lastKey) {
        case "j":
          state.changeState("attack1");
          break;
        case "k":
          state.changeState("attack2");
          break;
        case "l":
          state.changeState("attack3");
          break;
      }

      if (state.isAttacking()) {
        return;
      }

      if (input.isKeyDown("w")) {
        velocity.dy = -velocity.speed;
      }
      if (input.isKeyDown("s")) {
        velocity.dy = velocity.speed;
      }
      if (input.isKeyDown("a")) {
        velocity.dx = -velocity.speed;
      }
      if (input.isKeyDown("d")) {
        velocity.dx = velocity.speed;
      }
    });
  }
}
