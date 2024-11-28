import {
  AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { InputComponent } from "../components/input.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "./entity";

const idleImage = document.getElementById("player-idle") as HTMLImageElement;

const animations: { [key: string]: AnimatedSprite } = {
  idle: {
    image: idleImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 4,
    frameDuration: 60 / 1000,
    scale: 2,
    currentFrame: 0,
    anchor: { x: -34, y: -128 },
    loop: true,
  },
};

export class PlayerEntity extends Entity {
  constructor() {
    super("player");
    this.addComponent(new PositionComponent(500, 500));
    this.addComponent(new VelocityComponent(0, 0));
    this.addComponent(new InputComponent());
    this.addComponent(new AnimatedSpriteComponent("idle", animations));
  }
}
