import { BoundaryComponent } from "../components/boundary.component";
import { ColliderComponent } from "../components/collider.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { isDefined, isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class MovementSystem extends System {
  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const collider = entity.getComponent(ColliderComponent);
      const boundary = entity.getComponent(BoundaryComponent);

      if (isNullOrUndefined(position) || isNullOrUndefined(velocity)) {
        return;
      }

      if (
        isDefined(boundary) &&
        !boundary.isInBoundary(
          position.x + velocity.dx,
          position.y + velocity.dy,
        )
      ) {
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
