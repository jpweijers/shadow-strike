import { State } from "../components/state.component";
import { AnimatedSprite } from "../components/animated-sprite.component";
import { Attack, AttackType } from "../components/attack.component";

export type AnimationConfig = Record<State, AnimatedSprite>;

export type AttackConfig = Record<AttackType, Attack>;
