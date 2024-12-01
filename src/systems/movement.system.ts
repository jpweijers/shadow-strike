import { AIComponent } from "../components/ai.component";
import { BoundaryComponent } from "../components/boundary.component";
import { ColliderComponent } from "../components/collider.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { isDefined, isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class MovementSystem extends System {
  update(entities: Entity[]): void {
    const collisionEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(ColliderComponent) &&
        entity.hasComponent(VelocityComponent)
      );
    });

    entities.forEach((entity) => {
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const collider = entity.getComponent(ColliderComponent);
      const boundary = entity.getComponent(BoundaryComponent);
      const ai = entity.getComponent(AIComponent);

      if (
        isNullOrUndefined(position) ||
        isNullOrUndefined(velocity) ||
        isNullOrUndefined(collider)
      ) {
        return;
      }

      if (
        isDefined(boundary) &&
        !boundary.isInBoundary(
          position.x + velocity.dx,
          position.y + velocity.dy,
        ) &&
        isNullOrUndefined(ai)
      ) {
        return;
      }

      collider.x += velocity.dx;
      collider.y += velocity.dy;

      if (this.collidesWithOtherEntity(collider, collisionEntities)) {
        collider.x = position.x;
        collider.y = position.y;
        return;
      }

      position.x = collider.x;
      position.y = collider.y;
    });
  }

  collidesWithOtherEntity(self: ColliderComponent, others: Entity[]): boolean {
    let isColliding = false;
    others.forEach((other) => {
      const collider = other.getComponent(ColliderComponent);
      if (isNullOrUndefined(collider)) {
        return;
      }
      if (collider === self) {
        return;
      }
      if (self.isColliding(collider)) {
        isColliding = true;
      }
    });
    return isColliding;
  }
}
