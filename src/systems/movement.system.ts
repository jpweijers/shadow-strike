import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class MovementSystem extends System {
  update(entities: Entity[]) {
    const moveableEntities = entities.filter((entity) =>
      entity.hasComponents([PositionComponent, VelocityComponent]),
    );

    moveableEntities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);

      if (position && velocity) {
        position.x += velocity.dx;
        position.y += velocity.dy;
      }
    });
  }
}
