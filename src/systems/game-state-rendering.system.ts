import { GameStateComponent } from "../components/game-state.component";
import { Entity } from "../entities/entity";
import { System } from "./system";

export class GameStateRenderingSystem extends System {
  constructor(private context: CanvasRenderingContext2D) {
    super();
  }

  update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const gameState = entity.getComponent(GameStateComponent);
      if (!gameState) {
        return;
      }

      this.context.save();
      this.context.font = "24px Arial";
      this.context.fillText(`Score: ${gameState.getScore()}`, 10, 30);
      this.context.fillText(`Kills: ${gameState.getEnemiesKilled()}`, 10, 60);
      this.context.restore();
    });
  }
}
