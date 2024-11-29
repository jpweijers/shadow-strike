import { AttackComponent } from "../components/attack.component";
import { ColliderComponent } from "../components/collider.component";
import { HealthComponent } from "../components/health.component";
import { Entity } from "../entities/entity";
import { isNullOrUndefined } from "../utils/helpers";
import { System } from "./system";

export class HitDetectionSystem extends System {
  update(entities: Entity[]): void {
    const attackEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(AttackComponent) &&
        entity.hasComponent(ColliderComponent)
      );
    });

    const collisionEntities = entities.filter((entity) => {
      return (
        entity.hasComponent(ColliderComponent) &&
        entity.hasComponent(HealthComponent)
      );
    });

    attackEntities.forEach((attackEntity) => {
      const attackComponent = attackEntity.getComponent(AttackComponent);
      const attack = attackEntity.getComponent(ColliderComponent);

      if (isNullOrUndefined(attack) || isNullOrUndefined(attackComponent)) {
        return;
      }

      collisionEntities.forEach((collisionEntity) => {
        const collision = collisionEntity.getComponent(ColliderComponent);
        const health = collisionEntity.getComponent(HealthComponent);

        if (isNullOrUndefined(collision) || isNullOrUndefined(health)) {
          return;
        }

        // don't hit attack itself
        if (attackEntity === collisionEntity) {
          return;
        }

        // don't hit attack's owner
        if (attackComponent?.owner === collisionEntity) {
          return;
        }

        // don't hit already damaged entities
        if (attackComponent.damagedEntities.includes(collisionEntity)) {
          return;
        }

        if (attack.isColliding(collision)) {
          console.log("hit");
          health.takeDamage(attackComponent.damage);
        }
        attackComponent.addDamagedEntity(collisionEntity);
      });
    });
  }
}
