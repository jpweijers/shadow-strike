import { AudioComponent } from "../components/audio.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { isNullOrUndefined } from "../utils/helpers";

export class AudioSystem extends System {
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const audio = entity.getComponent(AudioComponent);

      if (isNullOrUndefined(audio)) {
        return;
      }

      //audio.play();
    });
  }
}
