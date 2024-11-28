import { Entity } from "../entities/entity";
import { System } from "../systems/system";

export class Engine {
  public entities: Entity[] = [];
  private systems: Array<System> = [];

  addEntity(entity: Entity): void {
    this.entities.push(entity);
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
