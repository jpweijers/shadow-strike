import { AIComponent } from "../components/ai.component";
import {
  AnimatedSprite,
  AnimatedSpriteComponent,
} from "../components/animated-sprite.component";
import {
  Attack,
  AttackComponent,
  AttackType,
} from "../components/attack.component";
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
const attack1Image = window.document.getElementById(
  "enemy-attack-1",
) as HTMLImageElement;
const attack2Image = window.document.getElementById(
  "enemy-attack-2",
) as HTMLImageElement;
const attack3Image = window.document.getElementById(
  "enemy-attack-3",
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
  attack1: {
    image: attack1Image,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 6,
    frameDuration: 60 / 1000,
    scale: 1.7,
    currentFrame: 0,
    anchor: { x: -64, y: -128 },
    loop: false,
  },
  attack2: {
    image: attack2Image,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 4,
    frameDuration: 60 / 1000,
    scale: 1.7,
    currentFrame: 0,
    anchor: { x: -64, y: -128 },
    loop: false,
  },
  attack3: {
    image: attack3Image,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 3,
    frameDuration: 60 / 1000,
    scale: 1.7,
    currentFrame: 0,
    anchor: { x: -64, y: -128 },
    loop: false,
  },
});

const attacks: Map<AttackType, Attack> = new Map([
  ["attack1", new Attack("attack1", 10, 50, 50)],
  ["attack2", new Attack("attack2", 20, 50, 50)],
  ["attack3", new Attack("attack3", 30, 50, 50)],
]);

export class EnemyEntity extends Entity {
  constructor() {
    super();
    const x = Math.floor(Math.random() * 1280);
    const y = Math.floor(Math.random() * (720 - 500) + 500);
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new VelocityComponent(0, 0, 1));
    this.addComponent(new AnimatedSpriteComponent(animations()));
    this.addComponent(new StateComponent("idle"));
    this.addComponent(new ColliderComponent(700, 700, 20));
    this.addComponent(new HealthComponent(100, 100));
    this.addComponent(new AttackComponent(attacks));
    this.addComponent(new AIComponent());
  }
}
