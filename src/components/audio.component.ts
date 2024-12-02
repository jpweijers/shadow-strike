import { Component } from "./component";

export class AudioComponent extends Component {
  constructor(
    private readonly sounds: Map<string, string>,
    public readonly volume: number,
    public readonly loop: boolean,
  ) {
    super();
  }

  getSound(key: string): string {
    return this.sounds.get(key) ?? "";
  }
}
