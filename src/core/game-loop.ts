import { EnemyEntity } from "../entities/enemy.entity";
import { PlayerEntity } from "../entities/player.entity";
import { AnimationStateSystem } from "../systems/animation-state.system";
import { AnimationSystem } from "../systems/animation.system";
import { AttackSystem } from "../systems/attack.system";
import { CollisionRenderingSystem } from "../systems/collision-rendering.system";
import { HealthRenderingSystem } from "../systems/health-rendering.system";
import { HitDetectionSystem } from "../systems/hit-detection.system";
import { InputProcessingSystem } from "../systems/input-processing.system";
import { InputSystem } from "../systems/input.system";
import { LifespanSystem } from "../systems/lifespan.system";
import { MovementStateSystem } from "../systems/movement-state.system";
import { MovementSystem } from "../systems/movement.system";
import { RenderingSystem } from "../systems/rendering.system";
import { StateSystem } from "../systems/state.system";
import { Engine } from "./engine";

export class GameLoop {
  private lastTime: number = 0;
  private engine: Engine = new Engine();

  constructor(private context: CanvasRenderingContext2D) {
    this.engine.addEntity(new PlayerEntity());
    this.engine.addEntity(new EnemyEntity());

    this.engine.addSystem(new InputSystem(this.engine));
    this.engine.addSystem(new InputProcessingSystem());
    this.engine.addSystem(new MovementSystem());
    this.engine.addSystem(new MovementStateSystem());
    this.engine.addSystem(new AttackSystem(this.engine));
    this.engine.addSystem(new AnimationStateSystem());
    this.engine.addSystem(new AnimationSystem());
    this.engine.addSystem(new HitDetectionSystem());
    this.engine.addSystem(new LifespanSystem(this.engine));
    this.engine.addSystem(new StateSystem());

    this.engine.addSystem(new RenderingSystem(this.context));
    this.engine.addSystem(new CollisionRenderingSystem(this.context));
    this.engine.addSystem(new HealthRenderingSystem(this.context));
  }

  loop(time: number = 0) {
    const deltaTime = (time - this.lastTime) / 1000;
    this.engine.update(deltaTime);
    this.lastTime = time;
    requestAnimationFrame(this.loop.bind(this));
  }
}
