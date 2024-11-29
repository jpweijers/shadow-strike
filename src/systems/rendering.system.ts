import {
  AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { PositionComponent } from "../components/position.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class RenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(entities: Entity[]) {
    this.clear();

    const renderingEntities = entities.filter(
      (entity) =>
        entity.hasComponent(PositionComponent) &&
        entity.hasComponent(AnimatedSpriteComponent) &&
        entity.hasComponent(StateComponent),
    );

    const renderingStack: {
      position: PositionComponent;
      sprite: AnimatedSprite;
      mirror?: boolean;
    }[] = [];

    renderingEntities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);
      const state = entity.getComponent(StateComponent);

      if (
        isNullOrUndefined(position) ||
        isNullOrUndefined(animatedSprite) ||
        isNullOrUndefined(state)
      ) {
        return;
      }

      renderingStack.push({
        position,
        sprite: animatedSprite.getAnimation(),
        mirror: animatedSprite.mirror,
      });
    });

    renderingStack.sort((a, b) => a.position.y - b.position.y);
    renderingStack.forEach(({ position, sprite, mirror }) => {
      this.render(position, sprite, mirror);
    });
  }

  private render(
    position: PositionComponent,
    sprite: AnimatedSprite,
    mirror: boolean = false,
  ) {
    if (isNullOrUndefined(sprite)) {
      return;
    }
    this.context.save();
    if (mirror) {
      this.context.scale(-1, 1);
      position.x *= -1;
    }
    this.context.drawImage(
      sprite.image,
      sprite.currentFrame * sprite.frameWidth,
      0,
      sprite.frameWidth,
      sprite.frameHeight,
      position.x + sprite.anchor.x * sprite.scale,
      position.y + sprite.anchor.y * sprite.scale,
      sprite.frameWidth * sprite.scale,
      sprite.frameHeight * sprite.scale,
    );
    if (mirror) {
      position.x *= -1;
    }
    this.context.restore();
  }

  private clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }
}
