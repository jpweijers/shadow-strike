import { Component } from "./component";

export class InputComponent extends Component {
  private keys: { [key: string]: boolean } = {};
  private keyStack: string[] = [];

  setKeyState(key: string, state: boolean): void {
    this.keys[key] = state;

    if (state) {
      this.keyStack.push(key);
      return;
    }
    this.keyStack = this.keyStack.filter((k) => k !== key);
  }

  isKeyDown(key: string): boolean {
    return this.keys[key] ?? false;
  }

  getLastKey(): string | undefined {
    return this.keyStack.pop();
  }
}
