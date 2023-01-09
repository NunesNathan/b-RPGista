import { ActionType } from "@prisma/client";
import { PrerequisiteNotFoundError } from "@application/auth/errors/prerequisite-not-found.error";
import { ParanormalPowersFactory } from "@test/factories/paranormalpowers-factory";
import { PrerequisiteFactory } from "@test/factories/prerequisite-factory";
import { Effects, EffectType } from "../effect/effects";
import { ParanormalPower } from "./paranormalpower";
import { InvalidActionTypeError } from "@application/auth/errors/invalid-action-type.error";
import { EffectsFactory } from "@test/factories/effects-factory";

describe("Paranormalpower entity", () => {
  const paranormalpower = ParanormalPowersFactory.paranormalPower();

  it("should be able to create an instance", () => {
    expect(paranormalpower).toBeInstanceOf(ParanormalPower);
    expect(paranormalpower.id).toBeDefined();
    expect(paranormalpower.name).toEqual("test");
    expect(paranormalpower.description).toEqual("test description");
    expect(paranormalpower.prerequisites).toEqual([]);
    expect(paranormalpower.action).toEqual(ActionType.FREE);
    expect(paranormalpower.literalEffects).toBeInstanceOf(Effects);
    expect(paranormalpower.effectsCount()).toEqual(2);
    expect(paranormalpower.creatorId).toEqual("creator-id");
    expect(paranormalpower.views).toEqual(0);
    expect(paranormalpower.favorites).toEqual(0);
    expect(paranormalpower.action).toEqual(ActionType.FREE);
    expect(paranormalpower.effect).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          effectType: EffectType.ATTRIBUTE,
        }),
        expect.objectContaining({
          effectType: EffectType.ANOTHER_PARANORMAL_POWER,
        }),
      ]),
    );
    expect(paranormalpower.createdAt).toBeInstanceOf(Date);
    expect(paranormalpower.updatedAt).toBeInstanceOf(Date);
  });

  it("should be able to add a new prerequisite", () => {
    paranormalpower.addPrerequisite(PrerequisiteFactory.prerequisite());

    expect(paranormalpower.prerequisites).toHaveLength(1);
  });

  it("should be able to remove a prerequisite", () => {
    const prerequiste = paranormalpower.prerequisites[0];

    paranormalpower.removePrerequisite(prerequiste.prerequisiteId);

    expect(paranormalpower.prerequisites).toHaveLength(0);
  });

  it("should not be able to remove a invalid prerequisite", () => {
    expect(() => paranormalpower.removePrerequisite("invalid-id")).toThrow(
      PrerequisiteNotFoundError,
    );
    expect(() => paranormalpower.removePrerequisite("invalid-id")).toThrow(
      "Prerequisite not founded",
    );
  });

  it("should be able to change the description", () => {
    paranormalpower.changeDescription("new description");

    expect(paranormalpower.description).toEqual("new description");
  });

  it("should be able to change the action", () => {
    paranormalpower.changeAction("free");

    expect(paranormalpower.action).toEqual(ActionType.FREE);
  });

  it("should not be able to change the action when it is not valid", () => {
    expect(() => paranormalpower.changeAction("invalid")).toThrow(
      InvalidActionTypeError,
    );
    expect(() => paranormalpower.changeAction("invalid")).toThrow(
      "Invalid action type",
    );
  });

  it("should be able to add a paranormalpower effect", () => {
    paranormalpower.addParanormalPowerEffect(EffectsFactory.Effect());

    expect(paranormalpower.effect[0].effectId).toBeDefined();
    expect(paranormalpower.effect[0].effectType).toEqual("ATTRIBUTE");
    expect(paranormalpower.effect[0].effect).toEqual("attribute");
  });

  it("should be able to remove a paranormalpower effect", () => {
    const skillEffect = paranormalpower.effect[0];

    paranormalpower.removeParanormalPowerEffect(skillEffect.effectId);

    expect(paranormalpower.effect).toEqual([]);
  });
});
