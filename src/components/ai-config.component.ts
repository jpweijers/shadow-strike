import { Component } from "./component";

export class AIConfigComponent extends Component {
  public readonly playerDetectionRadius: number = 150;
  public readonly enemyDetectionRadius: number = 100;
  public readonly attackProbability: number = 0.01;
}
