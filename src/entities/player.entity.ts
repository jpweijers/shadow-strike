import {
  AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import { InputComponent } from "../components/input.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "./entity";

const idleImage = document.getElementById("player-idle") as HTMLImageElement;
const walkImage = document.getElementById("player-walk") as HTMLImageElement;
const attackOneImage = document.getElementById(
  "player-attack-1",
) as HTMLImageElement;
const attackTwoImage = document.getElementById(
  "player-attack-2",
) as HTMLImageElement;
const attackThreeImage = document.getElementById(
  "player-attack-3",
) as HTMLImageElement;

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
  walk: {
    image: walkImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 4,
    frameDuration: 60 / 1000,
    scale: 2,
    currentFrame: 0,
    anchor: { x: -60, y: -128 },
    loop: true,
  },
  attack1: {
    image: attackOneImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 4,
    frameDuration: 60 / 1000,
    scale: 2,
    currentFrame: 0,
    anchor: { x: -60, y: -128 },
    loop: false,
  },
  attack2: {
    image: attackTwoImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 5,
    frameDuration: 60 / 1000,
    scale: 2,
    currentFrame: 0,
    anchor: { x: -60, y: -128 },
    loop: false,
  },
  attack3: {
    image: attackThreeImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 4,
    frameDuration: 60 / 1000,
    scale: 2,
    currentFrame: 0,
    anchor: { x: -60, y: -128 },
    loop: false,
  },
};

export class PlayerEntity extends Entity {
  constructor() {
    super("player");
    this.addComponent(new PositionComponent(500, 500));
    this.addComponent(new VelocityComponent(0, 0, 2));
    this.addComponent(new InputComponent());
    this.addComponent(new AnimatedSpriteComponent("idle", animations));
  }
}
