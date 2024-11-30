import { AnimationConfig, AttackConfig } from "./config.interface";

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
const deadImage = document.getElementById("player-dead") as HTMLImageElement;

export const playerAnimations = (): AnimationConfig => ({
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
  dead: {
    image: deadImage,
    frameWidth: 128,
    frameHeight: 128,
    frameCount: 4,
    frameDuration: 60 / 1000,
    scale: 2,
    currentFrame: 0,
    anchor: { x: -34, y: -128 },
    loop: false,
  },
});

export const playerAttacks = (): AttackConfig => ({
  attack1: {
    name: "attack1",
    damage: 40,
    radius: 50,
    offsetX: 65,
  },
  attack2: {
    name: "attack2",
    damage: 60,
    radius: 50,
    offsetX: 65,
  },
  attack3: {
    name: "attack3",
    damage: 30,
    radius: 40,
    offsetX: 65,
  },
});
