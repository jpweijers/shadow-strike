import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { isDefined, isNullOrUndefined } from "../utils/helpers";
import { AnimatedSpriteComponent } from "../components/animated-sprite.component";
import { VelocityComponent } from "../components/velocity.component";
import { LifespanComponent } from "../components/lifespan.component";
import { GameManagerEntity } from "../entities/game-manager.entity";
import { GameStateComponent } from "../components/game-state.component";
import { ColliderComponent } from "../components/collider.component";

export class StateSystem extends System {
  constructor(private gameManager: GameManagerEntity) {
    super();
  }

  update(entities: Entity[]): void {
    const gameState = this.gameManager.getComponent(GameStateComponent);
    if (isNullOrUndefined(gameState)) {
      return;
    }

    entities.forEach((entity) => {
      const state = entity.getComponent(StateComponent);
      if (isNullOrUndefined(state)) {
        return;
      }

      const animation = entity.getComponent(AnimatedSpriteComponent);
      const velocity = entity.getComponent(VelocityComponent);
      this.cleanup(entity, state, gameState);
      this.updateAnimation(state, animation);
      this.updateMovement(state, animation, velocity);
    });
  }

  private updateAnimation(
    state: StateComponent,
    animation?: AnimatedSpriteComponent,
  ): void {
    if (isDefined(animation)) {
      animation.changeAnimation(state.getState(), state.getDirection());
    }
  }

  private updateMovement(
    state: StateComponent,
    animation?: AnimatedSpriteComponent,
    velocity?: VelocityComponent,
  ): void {
    if (isNullOrUndefined(animation) || isNullOrUndefined(velocity)) {
      return;
    }

    // change to walk if moving
    if (velocity.isMoving()) {
      state.changeState("walk", velocity.direction());
      return;
    }

    if (state.isAttacking() && !animation.isDone()) {
      return;
    }

    if (state.getState() === "dead") {
      return;
    }

    state.changeState("idle");
  }

  private cleanup(
    entity: Entity,
    state: StateComponent,
    gameState: GameStateComponent,
  ): void {
    if (state.getState() !== "dead" || entity.hasComponent(LifespanComponent)) {
      return;
    }

    entity.removeComponent(VelocityComponent);
    entity.removeComponent(ColliderComponent);
    entity.addComponent(new LifespanComponent(5));
    gameState.killEnemy();
  }
}
