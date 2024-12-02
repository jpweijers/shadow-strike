import { PositionComponent } from "../components/position.component";
import { Engine } from "../core/engine";
import { GameManager } from "../core/game-manager";
import { EnemyEntity } from "../entities/enemy.entity";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class EnemySpawnerSystem extends System {
  private lastSpawnTime = Infinity;

  constructor(private engine: Engine) {
    super();
  }

  update(entities: Entity[], deltaTime: number): void {
    this.lastSpawnTime += deltaTime;

    const gameManager = GameManager.getInstance();

    if (this.lastSpawnTime < gameManager.getSpawnRate()) {
      return;
    }

    if (gameManager.getEnemiesAlive() >= gameManager.getMaxEnemies()) {
      return;
    }

    this.lastSpawnTime = 0;
    const [x, y] = this.findSpawnLocation(entities, gameManager);
    if (!x || !y) {
      return;
    }
    this.engine.addEntity(new EnemyEntity(x, y));
    gameManager.spawnEnemy();
  }

  findSpawnLocation(
    entities: Entity[],
    gameManager: GameManager,
  ): Array<number | null> {
    let locationFound = false;
    let candidateX = 0;
    let candidateY = 0;
    let maxTries = 100;

    const boundaries = gameManager.getBoundaries();
    const aiConfig = gameManager.getAIConfig();

    while (!locationFound && maxTries > 0) {
      candidateX =
        Math.random() * boundaries.maxX * 0.25 + boundaries.maxX + 200;

      candidateY =
        Math.random() * (boundaries.maxY - boundaries.minY) + boundaries.minY;

      if (Math.random() < 0.5) {
        candidateX = -candidateX;
      }

      locationFound = entities.every((entity) => {
        const position = entity.getComponent(PositionComponent);

        if (!position) {
          return true;
        }

        const dx = position.x - candidateX;
        const dy = position.y - candidateY;
        const distance = Math.hypot(dx, dy);

        maxTries--;
        return distance > aiConfig.enemyDetectionRadius * 2;
      });
    }
    return maxTries > 0 ? [candidateX, candidateY] : [null, null];
  }
}
