import { PositionComponent } from "../components/position.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class RenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(entities: Entity[]) {
    this.clear();

    const renderingEntities = entities.filter((entity) =>
      entity.hasComponents([PositionComponent]),
    );

    renderingEntities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      this.render(position);
    });
  }

  private render(position: PositionComponent) {
    this.context.beginPath();
    this.context.arc(position.x, position.y, 20, 0, Math.PI * 2);
    this.context.fill();
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
