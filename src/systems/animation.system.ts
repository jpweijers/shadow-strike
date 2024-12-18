import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class AnimationSystem extends System {
  update(entities: Entity[], deltaTime: number): void {
    const animatedEntities = entities.filter((entity) => {
      return entity.hasComponent(AnimatedSpriteComponent);
    });

    animatedEntities.forEach((entity) => {
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);

      if (!animatedSprite) {
        return;
      }

      const animation = animatedSprite.getAnimation();

      if (!animation) {
        return;
      }

      animatedSprite.elapsedTime += deltaTime;
      if (animatedSprite.elapsedTime >= animation.frameDuration) {
        animatedSprite.elapsedTime = 0;
        animation.currentFrame++;

        if (animation.currentFrame >= animation.frameCount) {
          if (animation.loop) {
            animation.currentFrame = 0;
          } else {
            animation.currentFrame = animation.frameCount - 1;
          }
        }
      }
    });
  }
}
