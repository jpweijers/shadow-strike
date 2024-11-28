import { Component } from "./component";

export class InputComponent extends Component {
  private keys: { [key: string]: boolean } = {};

  setKeyState(key: string, state: boolean) {
    this.keys[key] = state;
  }

  isKeyDown(key: string) {
    return this.keys[key] ?? false;
  }
}
