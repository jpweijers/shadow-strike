import { Engine } from "../core/engine";
import { EnemyEntity } from "../entities/enemy.entity";
import { System } from "./system";

export class EnemySpawnerSystem extends System {
  private lastSpawnTime = Infinity;
  private spawnRate = 4;
  private spawnCount = 0;
  private maxSpawnCount = 1;

  constructor(private engine: Engine) {
    super();
  }
  update(_: unknown, deltaTime: number): void {
    this.lastSpawnTime += deltaTime;

    if (this.lastSpawnTime < this.spawnRate) {
      return;
    }

    if (this.spawnCount >= this.maxSpawnCount) {
      return;
    }
    this.engine.addEntity(new EnemyEntity());
    this.lastSpawnTime = 0;
    this.spawnCount++;
  }
}
