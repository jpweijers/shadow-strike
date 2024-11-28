import { VelocityComponent } from "../components/velocity.component";
import { InputComponent } from "../components/input.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class InputProcessingSystem extends System {
  update(entities: Entity[]) {
    const inputEntities = entities.filter((entity) =>
      entity.hasComponents([InputComponent, VelocityComponent]),
    );

    inputEntities.forEach((entity) => {
      const input = entity.getComponent(InputComponent);
      const velocity = entity.getComponent(VelocityComponent);

      velocity.dx = 0;
      velocity.dy = 0;

      if (input.isKeyDown("w")) {
        velocity.dy = -1;
      }
      if (input.isKeyDown("s")) {
        velocity.dy = 1;
      }
      if (input.isKeyDown("a")) {
        velocity.dx = -1;
      }
      if (input.isKeyDown("d")) {
        velocity.dx = 1;
      }
    });
  }
}
