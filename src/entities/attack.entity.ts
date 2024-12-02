import { AttackDamageComponent } from "../components/attack-damage.component";
import { AudioComponent } from "../components/audio.component";
import { ColliderComponent } from "../components/collider.component";
import { LifespanComponent } from "../components/lifespan.component";
import { PositionComponent } from "../components/position.component";
import { Entity } from "./entity";

const sounds = (): Map<string, string> =>
  new Map<string, string>([
    ["hit", "sounds/hit.wav"],
    ["miss", "sounds/miss.wav"],
  ]);

export class AttackEntity extends Entity {
  constructor(
    x: number,
    y: number,
    radius: number,
    duration: number,
    owner: Entity,
    damage: number,
  ) {
    super();
    this.addComponent(new PositionComponent(x, y));
    this.addComponent(new ColliderComponent(x, y, radius));
    this.addComponent(new AttackDamageComponent(owner, damage));
    this.addComponent(new LifespanComponent(duration));
    this.addComponent(new AudioComponent(sounds(), 1, false));
  }
}
