import { InputComponent } from "../components/input.component";
import { Engine } from "../core/engine";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class InputSystem extends System {
  constructor(private engine: Engine) {
    super();
    window.addEventListener("keydown", (event) => {
      this.keyEventHandler(event.key, "down");
    });
    window.addEventListener("keyup", (event) => {
      this.keyEventHandler(event.key, "up");
    });
  }

  keyEventHandler(key: string, eventType: "down" | "up") {
    const inputEntities = this.engine.entities.filter((entity) => {
      return entity.hasComponent(InputComponent);
    });

    const state = eventType === "down" ? true : false;

    inputEntities.forEach((entity) => {
      const input = entity.getComponent(InputComponent);

      if (isNullOrUndefined(input)) {
        return;
      }

      input.setKeyState(key, state);
    });
  }

  update() {}
}
