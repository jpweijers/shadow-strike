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
    this.engine.addEntity(new EnemyEntity(...this.findSpawnLocation(entities)));
    this.gameState.spawnEnemy();
  }

  findSpawnLocation(entities: Entity[]): [number, number] {
    let locationFound = false;
    let candidateX = 0;
    let candidateY = 0;

    while (!locationFound) {
      candidateX =
        Math.random() * (this.boundary.maxX - this.boundary.minX) +
        this.boundary.minX;
      candidateY =
        Math.random() * (this.boundary.maxY - this.boundary.minY) +
        this.boundary.minY;

      locationFound = entities.every((entity) => {
        const position = entity.getComponent(PositionComponent);

        if (isNullOrUndefined(position)) {
          return true;
        }

        const dx = position.x - candidateX;
        const dy = position.y - candidateY;
        const distance = Math.hypot(dx, dy);

        return distance > this.aiConfig.enemyDetectionRadius * 2;
      });
    }

    return [candidateX, candidateY];
  }
}
