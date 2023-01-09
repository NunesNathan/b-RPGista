import { ActionType } from "@prisma/client";
import { EffectNotFoundError } from "@application/auth/errors/effect-not-found.error";
import { InvalidActionTypeError } from "@application/auth/errors/invalid-action-type.error";
import { Effect, Effects, EffectType } from "../effect/effects";
import { Prerequisite, PrerequisiteType } from "../prerequisite/prerequisite";
import { Skill } from "./skill";
import { SkillsFactory } from "@test/factories/skills-factory";

describe("Skill entity", () => {
  const skill = SkillsFactory.skill();

  const prerequisite = new Prerequisite({
    prerequisite: "prerequisite-name",
    prerequisiteType: PrerequisiteType.ANOTHER_SKILL,
  });

  it("should be able to create an instance", () => {
    expect(skill).toBeInstanceOf(Skill);
    expect(skill.name).toEqual("test");
    expect(skill.description).toEqual("test description");
    expect(skill.action).toEqual(ActionType.FREE);
    expect(skill.effect).toEqual([]);
    expect(skill.literalEffects).toBeInstanceOf(Effects);
    expect(skill.effectsCount()).toEqual(0);
    expect(skill.creatorId).toEqual("creator-id");
    expect(skill.views).toEqual(0);
    expect(skill.favorites).toEqual(0);
    expect(skill.createdAt).toBeInstanceOf(Date);
    expect(skill.updatedAt).toBeInstanceOf(Date);
  });

  it("should be able to add a prerequisite", () => {
    expect(skill.prerequisites.length).toEqual(0);

    skill.addPrerequisite(prerequisite);

    expect(skill.prerequisites.length).toEqual(1);
    expect(skill.prerequisites[0]).toEqual(prerequisite);
  });

  it("should be able to remove a prerequisite", () => {
    skill.removePrerequisite(prerequisite.prerequisiteId);

    expect(skill.prerequisites).toHaveLength(0);
  });

  it("should be able to change the description", () => {
    skill.changeDescription("new description");

    expect(skill.description).toEqual("new description");
  });

  it("should be able to change the action", () => {
    skill.changeAction("free");

    expect(skill.action).toEqual(ActionType.FREE);
  });

  it("should not be able to change the action when it is not valid", () => {
    expect(() => skill.changeAction("invalid")).toThrow(InvalidActionTypeError);
    expect(() => skill.changeAction("invalid")).toThrow("Invalid action type");
  });

  it("should be able to add a skill effect", () => {
    skill.addSkillEffect({
      effectType: EffectType.ATTRIBUTE,
      effect: "attribute",
    } as Effect);

    expect(skill.effect[0].effectId).toBeDefined();
    expect(skill.effect[0].effectType).toEqual("ATTRIBUTE");
    expect(skill.effect[0].effect).toEqual("attribute");
  });

  it("should be able to remove a skill effect", () => {
    const skillEffect = skill.effect[0];

    skill.removeSkillEffect(skillEffect.effectId);

    expect(skill.effect).toEqual([]);
  });

  it("should not be able to remove a  invalid skill effect", () => {
    expect(() => skill.removeSkillEffect("invalid-id")).toThrow(
      EffectNotFoundError,
    );
    expect(() => skill.removeSkillEffect("invalid-id")).toThrow(
      "Effect not founded",
    );
  });
});
