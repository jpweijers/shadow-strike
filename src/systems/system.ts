import { Entity } from "../entities/entity";

export abstract class System {
  abstract update(entities: Entity[], deltaTime: number): void;
}
