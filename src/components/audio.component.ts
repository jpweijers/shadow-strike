import { Component } from "./component";

export class AudioComponent extends Component {
  private audio: HTMLAudioElement;

  constructor(
    public readonly url: string,
    public readonly volume: number,
    loop: boolean,
  ) {
    super();
    this.audio = new Audio(url);
    this.audio.volume = volume;

    this.audio.addEventListener("ended", () => {
      this.audio.currentTime = 0;
      if (loop) {
        this.play();
      }
    });
  }

  play(): void {
    if (this.audio.currentTime > 0) {
      return;
    }
    this.audio.play().catch((error) => {
      console.error(`Error playing audio: ${error}`);
    });
  }
}
