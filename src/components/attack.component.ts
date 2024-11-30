import { Component } from "./component";

export class Attack {
  constructor(
    public name: string,
    public damage: number,
    public radius: number,
    public offsetX: number,
  ) {}
}

export type AttackType = "attack1" | "attack2" | "attack3";

export class AttackComponent extends Component {
  constructor(private attacks: Map<AttackType, Attack>) {
    super();
  }

  getAttack(attackType: AttackType): Attack | undefined {
    return this.attacks.get(attackType);
  }
}
