import { BackgroundLayer } from "./background.component";
import { Component } from "./component";

export class BattleGroundComponent extends Component {
  constructor(private layer: BackgroundLayer) {
    super();
  }

  getLayer() {
    return this.layer;
  }
}
