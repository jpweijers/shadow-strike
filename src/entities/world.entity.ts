import {
  BackgroundComponent,
  BackgroundLayer,
} from "../components/background.component";
import { BattleGroundComponent } from "../components/battle-ground.component";
import { Entity } from "./entity";

const background1 = window.document.getElementById(
  "background-1",
) as HTMLImageElement;
const background2 = window.document.getElementById(
  "background-2",
) as HTMLImageElement;
const background3 = window.document.getElementById(
  "background-3",
) as HTMLImageElement;
const background4 = window.document.getElementById(
  "background-4",
) as HTMLImageElement;
const ground = window.document.getElementById("ground") as HTMLImageElement;

const offsetY = -200;
const backgroundLayers: BackgroundLayer[] = [
  { image: background1, speed: 0.1, offsetX: 0, offsetY },
  { image: background2, speed: 0.2, offsetX: 0, offsetY },
  { image: background3, speed: 0.3, offsetX: 0, offsetY },
  { image: background4, speed: 0.4, offsetX: 0, offsetY },
];

const groundLayer: BackgroundLayer = {
  image: ground,
  speed: 1,
  offsetX: 0,
  offsetY: 150,
};

export class WorldEntity extends Entity {
  constructor() {
    super();

    this.addComponent(new BackgroundComponent(backgroundLayers));
    this.addComponent(new BattleGroundComponent(groundLayer));
  }
}
