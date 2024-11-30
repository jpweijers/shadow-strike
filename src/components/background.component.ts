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

  getLayers(): BackgroundLayer[] {
    return this.layers;
  }

  update(): void {
    this.layers.forEach((layer) => {
      layer.offsetX -= layer.speed;
      if (layer.offsetX <= -this.width) {
        layer.offsetX = 0;
      }
    });
  }
}
