import { GameStateComponent } from "../components/game-state.component";
import { Engine } from "../core/engine";
import { EnemyEntity } from "../entities/enemy.entity";
import { GameManagerEntity } from "../entities/game-manager.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class EnemySpawnerSystem extends System {
  private lastSpawnTime = Infinity;

  constructor(
    private engine: Engine,
    private gameManager: GameManagerEntity,
  ) {
    super();
  }

  update(_: unknown, deltaTime: number): void {
    this.lastSpawnTime += deltaTime;

    const gameState = this.gameManager.getComponent(GameStateComponent);

    if (isNullOrUndefined(gameState)) {
      return;
    }

    if (this.lastSpawnTime < gameState.getSpawnRate()) {
      return;
    }

    if (gameState.getEnemiesAlive() >= gameState.getMaxEnemies()) {
      return;
    }

    this.lastSpawnTime = 0;
    this.engine.addEntity(new EnemyEntity());
    gameState.spawnEnemy();
  }
}
