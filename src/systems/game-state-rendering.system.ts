import { System } from "./system";
import { GameManager } from "../core/game-manager";

export class GameStateRenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(): void {
    const gameManager = GameManager.getInstance();

    this.context.save();
    this.context.font = "24px Arial";
    this.context.fillText(`Score: ${gameManager.getScore()}`, 10, 30);
    this.context.fillText(`Kills: ${gameManager.getEnemiesKilled()}`, 10, 60);
    this.context.restore();
  }
}
