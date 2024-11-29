import { ColliderComponent } from "../components/collider.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class MovementSystem extends System {
  update(entities: Entity[]) {
    const moveableEntities = entities.filter((entity) =>
      entity.hasComponents([PositionComponent, VelocityComponent]),
    );

    moveableEntities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const collider = entity.getComponent(ColliderComponent);

      if (isNullOrUndefined(position) || isNullOrUndefined(velocity)) {
        return;
      }

      position.x += velocity.dx;
      position.y += velocity.dy;

      if (isNullOrUndefined(collider)) {
        return;
      }

      collider.x = position.x;
      collider.y = position.y;
    });
  }
}
