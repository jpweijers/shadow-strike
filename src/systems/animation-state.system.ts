import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class AnimationStateSystem extends System {
  update(entities: Entity[]) {
    entities.forEach((entity) => {
      const state = entity.getComponent(StateComponent);
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);

      if (isNullOrUndefined(state) || isNullOrUndefined(animatedSprite)) {
        return;
      }

      animatedSprite.changeAnimation(state.getState());
    });
  }
}
