import { GameStateComponent } from "../components/game-state.component";
import { Entity } from "./entity";

export class GameManagerEntity extends Entity {
  constructor() {
    super();
    this.addComponent(new GameStateComponent());
  }
}
