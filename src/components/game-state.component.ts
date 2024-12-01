import { Component } from "./component";

export class GameStateComponent extends Component {
  private score: number = 0;
  private enemiesKilled: number = 0;
  private enemiesAlive: number = 0;
  private maxEnemies: number = 10;
  private spawnRate: number = 1;

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
  }
}
