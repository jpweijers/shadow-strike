import { Component } from "./component";

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
  private _state: string = "idle";
  private animations: { [key: string]: AnimatedSprite };
  private _mirror: boolean = false;

  get state(): string {
    return this._state;
  }

  get elapsedTime(): number {
    return this._elapsedTime;
  }

  set elapsedTime(value: number) {
    this._elapsedTime = value;
  }

  get animation(): AnimatedSprite {
    return this.animations[this._state];
  }

  get mirror(): boolean {
    return this._mirror;
  }

  constructor(
    defaultState: string,
    animations: { [key: string]: AnimatedSprite },
  ) {
    super();
    this._state = defaultState;
    this.animations = animations;
  }

  changeAnimation(state: string): void {
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
      this.animation.loop === false &&
      this.animations[this._state].currentFrame ===
        this.animations[this._state].frameCount
    );
  }
}
