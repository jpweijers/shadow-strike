import { AnimationConfig, AttackConfig } from "./config.interface";

const idleImage = window.document.getElementById(
  "enemy-idle",
) as HTMLImageElement;
const walkImage = window.document.getElementById(
  "enemy-walk",
) as HTMLImageElement;
const deadImage = window.document.getElementById(
  "enemy-dead",
) as HTMLImageElement;
const attackOneImage = window.document.getElementById(
  "enemy-attack-1",
) as HTMLImageElement;
const attackTwoImage = window.document.getElementById(
  "enemy-attack-2",
) as HTMLImageElement;
const attackThreeImage = window.document.getElementById(
  "enemy-attack-3",
) as HTMLImageElement;

export const enemyAnimations = (): AnimationConfig => ({
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
    image: attackOneImage,
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
    image: attackTwoImage,
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
    image: attackThreeImage,
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

export const enemyAttacks = (): AttackConfig => ({
  attack1: {
    name: "attack1",
    damage: 10,
    radius: 50,
    offsetX: 50,
  },
  attack2: {
    name: "attack2",
    damage: 20,
    radius: 50,
    offsetX: 50,
  },
  attack3: {
    name: "attack3",
    damage: 30,
    radius: 50,
    offsetX: 50,
  },
});
