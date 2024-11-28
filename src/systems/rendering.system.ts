import {
  AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { PositionComponent } from "../components/position.component";
import { Entity } from "../entities/entity";
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
        entity.hasComponent(AnimatedSpriteComponent),
    );

    renderingEntities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const animatedSprite = entity.getComponent(AnimatedSpriteComponent);
      this.render(position, animatedSprite.animation);
    });
  }

  private render(position: PositionComponent, sprite: AnimatedSprite) {
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
    this.context.beginPath();
    this.context.arc(position.x, position.y, 20, 0, Math.PI * 2);
    this.context.stroke();
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
