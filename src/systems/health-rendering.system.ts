import { HealthComponent } from "../components/health.component";
import { PositionComponent } from "../components/position.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class HealthRenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(entites: Entity[]): void {
    entites.forEach((entity) => {
      const health = entity.getComponent(HealthComponent);
      const position = entity.getComponent(PositionComponent);

      if (!health || !position) {
        return;
      }

      this.render(position, health);
    });
  }

  private render(position: PositionComponent, health: HealthComponent): void {
    this.context.fillText(
      `${health.currentHealth}/${health.maxHealth}`,
      position.x - 24,
      position.y - 158,
    );
  }
}
