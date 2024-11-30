import { AIComponent } from "../components/ai.component";
import { PositionComponent } from "../components/position.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { PlayerEntity } from "../entities/player.entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class AISystem extends System {
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
      if (
        isNullOrUndefined(ai) ||
        isNullOrUndefined(position) ||
        isNullOrUndefined(velocity)
      ) {
        return;
      }

      this.moveTowardsPlayer(position, velocity, playerPosition, 150);
    });
  }

  private moveTowardsPlayer(
    position: PositionComponent,
    velocity: VelocityComponent,
    playerPosition: PositionComponent,
    stopRange: number,
  ) {
    const dx = playerPosition.x - position.x;
    const dy = playerPosition.y - position.y;
    const distance = Math.hypot(dy, dx);

    if (distance < stopRange) {
      velocity.dx = 0;
      velocity.dy = 0;
      return;
    }

    const directionX = dx / distance;
    const directionY = dy / distance;

    velocity.dx = directionX * velocity.speed;
    velocity.dy = directionY * velocity.speed;
  }
}
