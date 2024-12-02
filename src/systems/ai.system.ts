import { AIConfigComponent } from "../components/ai-config.component";
import { AIComponent } from "../components/ai.component";
import { ColliderComponent } from "../components/collider.component";
import { PositionComponent } from "../components/position.component";
import { StateComponent } from "../components/state.component";
import { VelocityComponent } from "../components/velocity.component";
import { Entity } from "../entities/entity";
import { GameManagerEntity } from "../entities/game-manager.entity";
import { PlayerEntity } from "../entities/player.entity";
import { System } from "./system";

export class AISystem extends System {
  private aiConfig: AIConfigComponent;

  constructor(
    private player: PlayerEntity,
    private gameManager: GameManagerEntity,
  ) {
    super();
    const aiConfig = this.gameManager.getComponent(AIConfigComponent);
    if (!aiConfig) {
      throw new Error("AIConfigComponent not found");
    }
    this.aiConfig = aiConfig;
  }

  update(entities: Entity[], deltaTime: number): void {
    const playerPosition = this.player.getComponent(PositionComponent);
    if (!playerPosition) {
      return;
    }

    entities.forEach((entity) => {
      // Do AI stuff
      const ai = entity.getComponent(AIComponent);
      const position = entity.getComponent(PositionComponent);
      const collider = entity.getComponent(ColliderComponent);
      const velocity = entity.getComponent(VelocityComponent);
      const state = entity.getComponent(StateComponent);

      if (!ai || !position || !velocity || !state || !collider) {
        return;
      }

      ai.update(deltaTime);

      const aiState = ai.getState();
      const playerInRange = this.playerInRange(position, playerPosition);
      const otherAIInTheWay = this.otherAIInTheWay(
        position,
        velocity,
        playerPosition,
        entities,
      );

      if (aiState === "attacking" && state.getState() === "idle") {
        ai.changeState("idle");
        return;
      }

      switch (aiState) {
        case "idle":
          this.handleIdleState(ai, playerInRange, otherAIInTheWay);
          break;
        case "chasing":
          this.handleChasingState(
            ai,
            playerInRange,
            otherAIInTheWay,
            position,
            velocity,
            playerPosition,
          );
          //this.avoidOtherAIs(ai, position, collider, velocity, entities);
          break;
        case "attacking":
        case "dead":
          // do nothing
          break;
      }
    });
  }

  private handleIdleState(
    ai: AIComponent,
    playerInRange: boolean,
    otherAIInTheWay: boolean,
  ): void {
    if (!playerInRange && !otherAIInTheWay) {
      ai.changeState("chasing");
      return;
    }
    if (!playerInRange) {
      return;
    }
    if (Math.random() <= this.aiConfig.attackProbability) {
      ai.changeState("attacking");
      return;
    }
  }

  private handleChasingState(
    ai: AIComponent,
    playerInRange: boolean,
    otherAIInTheWay: boolean,
    position: PositionComponent,
    velocity: VelocityComponent,
    playerPosition: PositionComponent,
  ): void {
    if (playerInRange) {
      velocity.dx = 0;
      velocity.dy = 0;
      ai.changeState("idle");
      return;
    }
    if (otherAIInTheWay) {
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
  ): boolean {
    const dx = playerPosition.x - position.x;
    const dy = playerPosition.y - position.y;
    return Math.hypot(dy, dx) <= this.aiConfig.playerDetectionRadius;
  }

  private moveTowardsPlayer(
    position: PositionComponent,
    velocity: VelocityComponent,
    playerPosition: PositionComponent,
  ): void {
    const dx = playerPosition.x - position.x;
    const dy = playerPosition.y - position.y;
    const distance = Math.hypot(dy, dx);

    const directionX = dx / distance;
    const directionY = dy / distance;

    velocity.dx = directionX * velocity.speed;
    velocity.dy = directionY * velocity.speed;
  }

  private otherAIInTheWay(
    position: PositionComponent,
    velocity: VelocityComponent,
    playerPosition: PositionComponent,
    entities: Entity[],
  ): boolean {
    return entities.some((entity) => {
      const otherPosition = entity.getComponent(PositionComponent);
      const otherCollider = entity.getComponent(ColliderComponent);

      if (
        !otherPosition ||
        !otherCollider ||
        otherPosition.id === position.id ||
        otherPosition.id === playerPosition.id
      ) {
        return false;
      }

      // calculate the direction towards the player
      const dx = playerPosition.x - position.x;
      const dy = playerPosition.y - position.y;
      const distance = Math.hypot(dy, dx);

      const directionX = dx / distance;
      const directionY = dy / distance;

      const tempCollider = new ColliderComponent(
        position.x + directionX * velocity.speed,
        position.y + directionY * velocity.speed,
        this.aiConfig.enemyDetectionRadius,
      );

      if (tempCollider.isColliding(otherCollider)) {
        return true;
      }
    });
  }
}
