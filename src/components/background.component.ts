import { Component } from "./component";

export type BackgroundLayer = {
  image: HTMLImageElement;
  speed: number;
  offsetX: number;
  offsetY: number;
};

export class BackgroundComponent extends Component {
  constructor(
    private layers: BackgroundLayer[] = [],
    private width: number = 1280,
  ) {
    super();
  }

  getLayers() {
    return this.layers;
  }

  update() {
    console.log("BackgroundComponent update");
    this.layers.forEach((layer) => {
      layer.offsetX -= layer.speed;
      if (layer.offsetX <= -this.width) {
        layer.offsetX = 0;
      }
    });
  }
}
