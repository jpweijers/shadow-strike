export interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface AIConfig {
  playerDetectionRadius: number;
  enemyDetectionRadius: number;
  attackProbability: number;
}

export class GameManager {
  private static instance: GameManager;

  private score: number = 0;
  private enemiesKilled: number = 0;
  private enemiesAlive: number = 0;
  private maxEnemies: number = 10;
  private spawnRate: number = 1;

  private boundaries: Boundaries = {
    minX: 0,
    maxX: 1280,
    minY: 500,
    maxY: 720,
  };

  private AIConfig: AIConfig = {
    playerDetectionRadius: 150,
    enemyDetectionRadius: 100,
    attackProbability: 0.1,
  };

  private constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  getScore(): number {
    return this.score;
  }

  getEnemiesKilled(): number {
    return this.enemiesKilled;
  }

  getEnemiesAlive(): number {
    return this.enemiesAlive;
  }

  getMaxEnemies(): number {
    return this.maxEnemies;
  }

  getSpawnRate(): number {
    return this.spawnRate;
  }

  spawnEnemy(): void {
    this.enemiesAlive++;
  }

  killEnemy(): void {
    this.enemiesKilled++;
    this.enemiesAlive--;
    this.score += 100;

    if (this.enemiesKilled % 5 === 0) {
      this.maxEnemies++;
      this.spawnRate *= 0.9;
    }
  }

  getBoundaries(): Boundaries {
    return this.boundaries;
  }

  getAIConfig(): AIConfig {
    return this.AIConfig;
  }
}
