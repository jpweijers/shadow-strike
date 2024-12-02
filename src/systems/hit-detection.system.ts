import { AttackDamageComponent } from "../components/attack-damage.component";
import { ColliderComponent } from "../components/collider.component";
import { HealthComponent } from "../components/health.component";
import { StateComponent } from "../components/state.component";
import { Entity } from "../entities/entity";
import { System } from "./system";
import { AudioComponent } from "../components/audio.component";
import { AudioManager } from "../core/audio-manager";

export class HitDetectionSystem extends System {
  update(entities: Entity[]): void {
    const collisionEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(ColliderComponent) &&
        entity.hasComponent(HealthComponent)
      );
    });

    entities.forEach((attackEntity) => {
      const attackDamage = attackEntity.getComponent(AttackDamageComponent);
      const attack = attackEntity.getComponent(ColliderComponent);
      const attackSound = attackEntity.getComponent(AudioComponent);

      if (!attack || !attackDamage || !attackSound) {
        return;
      }

      const ownerState = attackDamage.owner.getComponent(StateComponent);

      if (!ownerState || !ownerState.isAttacking()) {
        return;
      }

      collisionEntities.forEach((collisionEntity) => {
        const collision = collisionEntity.getComponent(ColliderComponent);
        const health = collisionEntity.getComponent(HealthComponent);

        if (!collision || !health) {
          return;
        }

        // don't hit attack itself
        if (attackEntity === collisionEntity) {
          return;
        }

        // don't hit attack's owner
        if (attackDamage?.owner === collisionEntity) {
          return;
        }

        // don't hit already damaged entities
        if (attackDamage.damagedEntities.includes(collisionEntity)) {
          return;
        }

        if (attack.isColliding(collision)) {
          AudioManager.getInstance().playSound(attackSound.getSound("hit"));
          health.takeDamage(attackDamage.damage);
        } else {
          AudioManager.getInstance().playSound(attackSound.getSound("miss"));
        }

        attackDamage.addDamagedEntity(collisionEntity);
      });
    });
  }
}
