import { Component } from "./component";
import { State } from "./state.component";
import { Direction } from "./velocity.component";

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

  get state(): State {
    return this._state;
  }

  constructor(animations: { [key: string]: AnimatedSprite }) {
    super();
    this.animations = animations;
  }

  changeAnimation(state: State, direction?: Direction): void {
    if (!this.animations[state]) {
      throw new Error(`Animation ${state} not found`);
    }

    if (direction) {
      this._mirror = direction === "left";
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

  isDone(): boolean {
    return (
      this.getAnimation().loop === false &&
      this.animations[this._state].currentFrame ===
        this.animations[this._state].frameCount - 1
    );
  }
}
