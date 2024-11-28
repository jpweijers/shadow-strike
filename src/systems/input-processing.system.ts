import { VelocityComponent } from "../components/velocity.component";
import { InputComponent } from "../components/input.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class InputProcessingSystem extends System {
  update(entities: Entity[]) {
    const inputEntities = entities.filter(
      (entity) =>
        entity.hasComponent(InputComponent) &&
        entity.hasComponent(VelocityComponent),
    );

    inputEntities.forEach((entity) => {
      const input = entity.getComponent(InputComponent);
      const velocity = entity.getComponent(VelocityComponent);

      velocity.dx = 0;
      velocity.dy = 0;

      if (input.isKeyDown("w")) {
        velocity.dy = -velocity.speed;
      }
      if (input.isKeyDown("s")) {
        velocity.dy = velocity.speed;
      }
      if (input.isKeyDown("a")) {
        velocity.dx = -velocity.speed;
      }
      if (input.isKeyDown("d")) {
        velocity.dx = velocity.speed;
      }
    });
  }
}
