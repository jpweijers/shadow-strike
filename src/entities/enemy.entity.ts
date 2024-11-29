import {
  AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { ColliderComponent } from "../components/collider.component";
import { HealthComponent } from "../components/health.component";
import { PositionComponent } from "../components/position.component";
import { StateComponent } from "../components/state.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "./entity";

const idleImage = window.document.getElementById(
  "enemy-idle",
) as HTMLImageElement;
const walkImage = window.document.getElementById(
  "enemy-walk",
) as HTMLImageElement;
const deadImage = window.document.getElementById(
  "enemy-dead",
) as HTMLImageElement;

const animations = (): { [key: string]: AnimatedSprite } => ({
  idle: {
    image: idleImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 6,
    frameDuration: 60 / 1000,
    scale: 1.7,
    currentFrame: 0,
    anchor: { x: -72, y: -128 },
    loop: true,
  },
  walk: {
    image: walkImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 8,
    frameDuration: 60 / 1000,
    scale: 1.7,
    currentFrame: 0,
    anchor: { x: -64, y: -128 },
    loop: true,
  },
  dead: {
    image: deadImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 6,
    frameDuration: 60 / 1000,
    scale: 1.7,
    currentFrame: 0,
    anchor: { x: -64, y: -128 },
    loop: false,
  },
});

export class EnemyEntity extends Entity {
  constructor() {
    super();
    const x = Math.floor(Math.random() * 1280);
    const y = Math.floor(Math.random() * (720 - 500) + 500);
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new VelocityComponent(0, 0));
    this.addComponent(new AnimatedSpriteComponent(animations()));
    this.addComponent(new StateComponent("idle"));
    this.addComponent(new ColliderComponent(700, 700, 20));
    this.addComponent(new HealthComponent(100, 100));
  }
}
