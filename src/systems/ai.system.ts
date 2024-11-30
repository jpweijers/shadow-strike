import { AIComponent } from "../components/ai.component";
import { PositionComponent } from "../components/position.component";
import { StateComponent } from "../components/state.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { PlayerEntity } from "../entities/player.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class AISystem extends System {
  private playerDetectionRadius = 150;
  private attackProbability = 0.025;

  constructor(private player: PlayerEntity) {
    super();
  }
  update(entities: Entity[]) {
    const playerPosition = this.player.getComponent(PositionComponent);
    if (isNullOrUndefined(playerPosition)) {
      return;
    }

    entities.forEach((entity) => {
      // Do AI stuff
      const ai = entity.getComponent(AIComponent);
      const position = entity.getComponent(PositionComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const state = entity.getComponent(StateComponent);

      if (
        isNullOrUndefined(ai) ||
        isNullOrUndefined(position) ||
        isNullOrUndefined(velocity) ||
        isNullOrUndefined(state)
      ) {
        return;
      }

      const aiState = ai.getState();
      const playerInRange = this.playerInRange(position, playerPosition);

      if (aiState === "attacking" && state.getState() === "idle") {
        ai.changeState("idle");
        return;
      }

      switch (aiState) {
        case "idle":
          this.handleIdleState(ai, playerInRange);
          break;
        case "chasing":
          this.handleChasingState(
            ai,
            playerInRange,
            position,
            velocity,
            playerPosition,
          );
          break;
        case "attacking":
        case "dead":
          // do nothing
          break;
      }
    });
  }

  private handleIdleState(ai: AIComponent, playerInRange: boolean) {
    if (!playerInRange) {
      ai.changeState("chasing");
      return;
    }
    if (Math.random() <= this.attackProbability) {
      ai.changeState("attacking");
      return;
    }
  }

  private handleChasingState(
    ai: AIComponent,
    playerInRange: boolean,
    position: PositionComponent,
    velocity: VelocityComponent,
    playerPosition: PositionComponent,
  ) {
    if (playerInRange) {
      velocity.dx = 0;
      velocity.dy = 0;
      ai.changeState("idle");
      return;
    }
    this.moveTowardsPlayer(position, velocity, playerPosition);
  }

  private playerInRange(
    position: PositionComponent,
    playerPosition: PositionComponent,
  ) {
    const dx = playerPosition.x - position.x;
    const dy = playerPosition.y - position.y;
    return Math.hypot(dy, dx) <= this.playerDetectionRadius;
  }

  private moveTowardsPlayer(
    position: PositionComponent,
    velocity: VelocityComponent,
    playerPosition: PositionComponent,
  ) {
    const dx = playerPosition.x - position.x;
    const dy = playerPosition.y - position.y;
    const distance = Math.hypot(dy, dx);

    const directionX = dx / distance;
    const directionY = dy / distance;

    velocity.dx = directionX * velocity.speed;
    velocity.dy = directionY * velocity.speed;
  }
}
