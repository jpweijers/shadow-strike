import { isNullOrUndefined } from "../utils/helpers";
import { Component } from "./component";

export class AudioComponent extends Component {
  constructor(
    private readonly sounds: Map<string, HTMLAudioElement>,
    public readonly volume: number,
    public readonly loop: boolean,
  ) {
    super();

    this.sounds.forEach((sound, key) => {
      sound.volume = volume;
      sound.addEventListener("ended", () => {
        if (loop) {
          sound.currentTime = 0;
          this.play(key);
        }
      });
    });
  }

  play(key: string): void {
    const sound = this.sounds.get(key);

    if (isNullOrUndefined(sound)) {
      return;
    }

    if (sound.currentTime > 0) {
      return;
    }

    sound.play();
  }
}
