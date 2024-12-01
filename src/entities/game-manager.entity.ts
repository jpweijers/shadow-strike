import { AIConfigComponent } from "../components/ai-config.component";
import { BoundaryComponent } from "../components/boundary.component";
import { GameStateComponent } from "../components/game-state.component";
import { Entity } from "./entity";

export class GameManagerEntity extends Entity {
  constructor(width: number, height: number) {
    super();
    this.addComponent(new GameStateComponent());
    this.addComponent(new AIConfigComponent());
    this.addComponent(new BoundaryComponent(0, width, height - 220, height));
  }
}
