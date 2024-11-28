import { PlayerEntity } from "../entities/player.entity";
import { InputProcessingSystem } from "../systems/input-processing.system";
import { InputSystem } from "../systems/input.system";
import { MovementSystem } from "../systems/movement.system";
import { RenderingSystem } from "../systems/rendering.system";
import { Engine } from "./engine";

export class GameLoop {
  private lastTime: number = 0;
  private engine: Engine = new Engine();

  constructor(private context: CanvasRenderingContext2D) {
    this.engine.addEntity(new PlayerEntity());

    this.engine.addSystem(new InputSystem(this.engine));
    this.engine.addSystem(new InputProcessingSystem());
    this.engine.addSystem(new MovementSystem());
    this.engine.addSystem(new RenderingSystem(this.context));
  }

  loop(time: number = 0) {
    const deltaTime = time - this.lastTime / 1000;
    this.lastTime = deltaTime;
    this.engine.update(deltaTime);
    requestAnimationFrame(this.loop.bind(this));
  }
}
