import { AIConfigComponent } from "../components/ai-config.component";
import { BoundaryComponent } from "../components/boundary.component";
import { GameStateComponent } from "../components/game-state.component";
import { PositionComponent } from "../components/position.component";
import { Engine } from "../core/engine";
import { EnemyEntity } from "../entities/enemy.entity";
import { Entity } from "../entities/entity";
import { GameManagerEntity } from "../entities/game-manager.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class EnemySpawnerSystem extends System {
  private lastSpawnTime = Infinity;
  private aiConfig: AIConfigComponent;
  private gameState: GameStateComponent;
  private boundary: BoundaryComponent;

  constructor(
    private engine: Engine,
    private gameManager: GameManagerEntity,
  ) {
    super();
    const aiConfig = this.gameManager.getComponent(AIConfigComponent);
    const gameState = this.gameManager.getComponent(GameStateComponent);
    const boundary = this.gameManager.getComponent(BoundaryComponent);
    if (
      isNullOrUndefined(aiConfig) ||
      isNullOrUndefined(gameState) ||
      isNullOrUndefined(boundary)
    ) {
      throw new Error(
        "EnemySpawnerSystem requires GameManagerEntity to have AIConfigComponent, BoundaryComponent, and GameStateComponent",
      );
    }
    this.aiConfig = aiConfig;
    this.gameState = gameState;
    this.boundary = boundary;
  }

  update(entities: Entity[], deltaTime: number): void {
    this.lastSpawnTime += deltaTime;

    if (this.lastSpawnTime < this.gameState.getSpawnRate()) {
      return;
    }

    if (this.gameState.getEnemiesAlive() >= this.gameState.getMaxEnemies()) {
      return;
    }

    this.lastSpawnTime = 0;
    const [x, y] = this.findSpawnLocation(entities);
    if (isNullOrUndefined(x) || isNullOrUndefined(y)) {
      return;
    }
    this.engine.addEntity(new EnemyEntity(x, y));
    this.gameState.spawnEnemy();
  }

  findSpawnLocation(entities: Entity[]): Array<number | null> {
    let locationFound = false;
    let candidateX = 0;
    let candidateY = 0;
    let maxTries = 100;

    while (!locationFound && maxTries > 0) {
      candidateX =
        Math.random() * this.boundary.maxX * 0.25 + this.boundary.maxX + 200;
      candidateY =
        Math.random() * (this.boundary.maxY - this.boundary.minY) +
        this.boundary.minY;

      if (Math.random() < 0.5) {
        candidateX = -candidateX;
      }

      locationFound = entities.every((entity) => {
        const position = entity.getComponent(PositionComponent);

        if (isNullOrUndefined(position)) {
          return true;
        }

        const dx = position.x - candidateX;
        const dy = position.y - candidateY;
        const distance = Math.hypot(dx, dy);

        maxTries--;
        return distance > this.aiConfig.enemyDetectionRadius * 2;
      });
    }
    return maxTries > 0 ? [candidateX, candidateY] : [null, null];
  }
}
