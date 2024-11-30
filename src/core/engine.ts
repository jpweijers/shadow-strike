import { Entity } from "../entities/entity";
import { System } from "../systems/system";

export class Engine {
  public entities: Entity[] = [];
  private systems: Array<System> = [];

  addEntity<E extends Entity>(entity: E): E {
    this.entities.push(entity);
    return entity;
  }

  removeEntity(entity: Entity): void {
    this.entities = this.entities.filter((e) => e.id !== entity.id);
  }

  addSystem(system: System): void {
    this.systems.push(system);
  }

  update(deltaTime: number): void {
    this.systems.forEach((system) => {
      system.update(this.entities, deltaTime);
    });
  }
}
