import { EffectNotFoundError } from "@application/auth/errors/effect-not-found.error";
import { EffectsFactory } from "@test/factories/effects-factory";
import { Effects, EffectType } from "./effects";

describe("Effects object value", () => {
  const effects = EffectsFactory.Effects();

  it("should be able to create an instance", () => {
    expect(effects).toBeInstanceOf(Effects);
    expect(effects.count).toBe(2);
    expect(effects.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ effectType: EffectType.ATTRIBUTE }),
        expect.objectContaining({
          effectType: EffectType.ANOTHER_PARANORMAL_POWER,
        }),
      ]),
    );
  });

  it("should be able to add an effect", () => {
    effects.addEffect(EffectsFactory.Effect());

    expect(effects.count).toBe(3);
  });

  it("should be able to remove an effect", () => {
    const effect = effects.value[2];

    effects.removeEffect(effect.effectId);

    expect(effects.count).toBe(2);
  });

  it("should not be able to remove an invalid effect", () => {
    expect(() => effects.removeEffect("invalid-id")).toThrow(
      EffectNotFoundError,
    );
    expect(() => effects.removeEffect("invalid-id")).toThrow(
      "Effect not founded",
    );
  });
});
