import { LifespanComponent } from "../components/lifespan.component";
import { Engine } from "../core/engine";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class LifespanSystem extends System {
  constructor(private engine: Engine) {
    super();
  }

  update(entities: Entity[], deltaTime: number): void {
    entities.forEach((entity) => {
      const lifespan = entity.getComponent(LifespanComponent);

      if (isNullOrUndefined(lifespan)) {
        return;
      }

      lifespan.update(deltaTime);

      if (lifespan.isExpired) {
        this.engine.removeEntity(entity);
      }
    });
  }
}
