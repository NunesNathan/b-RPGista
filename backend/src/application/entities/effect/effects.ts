import { randomUUID } from "node:crypto";
import { EffectNotFoundError } from "@application/auth/errors/effect-not-found.error";
import { InvalidEffectError } from "@application/auth/errors/invalid-effect.error";

export enum EffectType {
  ATTRIBUTE = "ATTRIBUTE",
  ANOTHER_SKILL = "ANOTHER_SKILL",
  ANOTHER_PARANORMAL_POWER = "ANOTHER_PARANORMAL_POWER",
  OTHER = "OTHER",
}

export interface Effect {
  effectId: string;
  effectType: EffectType;
  effect: string;
}

export interface EffectsProps {
  count: number;
  effects: Effect[];
}

export class Effects {
  private readonly props: EffectsProps;

  constructor(effects: Effect[]) {
    this.props = {
      count: effects.length,
      effects: effects,
    };
  }

  public get value(): Effect[] {
    return this.props.effects;
  }

  public addEffect(effect: Omit<Effect, "effectId">) {
    if (
      Object.values(EffectType).includes(
        effect.effectType.toUpperCase() as EffectType,
      )
    ) {
      this.props.effects.push({ ...effect, effectId: randomUUID() });
      this.props.count = this.props.effects.length;
    } else {
      throw new InvalidEffectError();
    }
  }

  public removeEffect(effectId: string) {
    let hasChanged = false;

    this.props.effects = this.props.effects.filter(
      (effect) => effect.effectId !== effectId && (hasChanged = true),
    );

    if (!hasChanged) {
      throw new EffectNotFoundError();
    }

    this.props.count = this.props.effects.length;
  }

  public get count(): number {
    return this.props.count;
  }

  public get this(): Effects {
    return this;
  }
}
