import {
  BackgroundComponent,
  BackgroundLayer,
} from "../components/background.component";
import { BattleGroundComponent } from "../components/battle-ground.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class BackgroundRenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(entities: Entity[]): void {
    this.clear();

    entities.forEach((entity) => {
      const background = entity.getComponent(BackgroundComponent);
      const ground = entity.getComponent(BattleGroundComponent);

      if (background) {
        background.getLayers().forEach((layer) => {
          this.render(layer);
        });
        background.update();
      }

      if (ground) {
        this.render(ground.getLayer());
      }
    });
  }

  render(layer: BackgroundLayer): void {
    this.context.drawImage(
      layer.image,
      layer.offsetX,
      layer.offsetY,
      this.context.canvas.width,
      this.context.canvas.height,
    );
    this.context.drawImage(
      layer.image,
      layer.offsetX + this.context.canvas.width - 2,
      layer.offsetY,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }

  private clear(): void {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }
}
