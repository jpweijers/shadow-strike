import { Component } from "./component";
import { State } from "./state.component";

export interface AnimatedSprite {
  image: HTMLImageElement;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  frameDuration: number;
  scale: number;
  currentFrame: number;
  anchor: { x: number; y: number };
  loop: boolean;
}

export class AnimatedSpriteComponent extends Component {
  private _elapsedTime: number = 0;
  private animations: { [key: string]: AnimatedSprite };
  private _mirror: boolean = false;
  private _state: State = "idle";

  get elapsedTime(): number {
    return this._elapsedTime;
  }

  set elapsedTime(value: number) {
    this._elapsedTime = value;
  }

  get mirror(): boolean {
    return this._mirror;
  }

  constructor(animations: { [key: string]: AnimatedSprite }) {
    super();
    this.animations = animations;
  }

  changeAnimation(state: State): void {
    if (!this.animations[state]) {
      throw new Error(`Animation ${state} not found`);
    }

    if (this._state === state) {
      return;
    }

    this._state = state;
    this._elapsedTime = 0;
    this.animations[this._state].currentFrame = 0;
  }

  getAnimation(): AnimatedSprite {
    return this.animations[this._state];
  }

  changeDirection(direction: "left" | "right"): void {
    if (direction === "right" && this._mirror) {
      this._mirror = false;
    }
    if (direction === "left" && !this._mirror) {
      this._mirror = true;
    }
  }

  isDone(): boolean {
    return (
      this.getAnimation().loop === false &&
      this.animations[this._state].currentFrame ===
        this.animations[this._state].frameCount - 1
    );
  }

  isAttacking(): boolean {
    if (!this._state.includes("attack")) {
      return false;
    }
    return (
      this.animations[this._state].currentFrame ===
      this.animations[this._state].frameCount - 1
    );
  }
}
