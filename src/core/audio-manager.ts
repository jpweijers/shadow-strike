export class AudioManager {
  private static instance: AudioManager;
  private audioCache: Map<string, HTMLAudioElement>;
  private globalVolume: number;

  constructor() {
    this.audioCache = new Map();
    this.globalVolume = 1;
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  setVolume(number: number): void {
    // set volume to value between 0 and 1
    this.globalVolume = Math.min(1, Math.max(0, number));
  }

  playSound(path: string, volume: number = 1, loop: boolean = false): void {
    const audio = this.getAudio(path);

    audio.volume = volume * this.globalVolume;
    audio.currentTime = 0;
    audio.loop = loop;
    audio.play().catch((error) => {
      console.error(`Failed to play audio: ${path}`, error);
    });
  }

  private getAudio(path: string): HTMLAudioElement {
    if (!this.audioCache.has(path)) {
      const audio = new Audio(path);
      this.audioCache.set(path, audio);
    }

    return this.audioCache.get(path) as HTMLAudioElement;
  }
}
