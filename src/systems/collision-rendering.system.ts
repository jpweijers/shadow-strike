import { System } from "./system";
import { Entity } from "../entities/entity";
import { ColliderComponent } from "../components/collider.component";

export class CollisionRenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const collider = entity.getComponent(ColliderComponent);

      if (!collider) {
        return;
      }

      const { x, y, radius } = collider;

      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.stroke();
    });
  }
}
