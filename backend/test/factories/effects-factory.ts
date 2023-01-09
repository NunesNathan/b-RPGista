import {
  Effect,
  Effects,
  EffectType,
} from "@application/entities/effect/effects";

type Override = Partial<Effect>;

export class EffectsFactory {
  static Effect(override: Override = {}): Effect {
    return {
      effectType: EffectType.ATTRIBUTE,
      effect: "attribute",
      ...override,
    } as Effect;
  }

  static Effects(override: Effect[] = []): Effects {
    const effects = new Effects([
      this.Effect(),
      this.Effect({ effectType: EffectType.ANOTHER_PARANORMAL_POWER }),
    ]);

    if (override) {
      override.forEach((effect) => effects.addEffect(effect));
    }

    return effects;
  }
}
