import { SkillNotFoundError } from "@application/auth/errors/skill-not-found.error";
import { SkillsFactory } from "@test/factories/skills-factory";
import { Skills } from "./skills";

describe("Skills value object", () => {
  const skills = new Skills([SkillsFactory.skill(), SkillsFactory.skill()]);

  it("should be able to create an instance", () => {
    expect(skills).toBeInstanceOf(Skills);
    expect(skills.count).toEqual(2);
    expect(skills.skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          creatorId: "creator-id",
        }),
        expect.objectContaining({
          creatorId: "creator-id",
        }),
      ]),
    );
  });

  it("should be able to add a skill", () => {
    skills.addSkill(SkillsFactory.skill());

    expect(skills.count).toEqual(3);
  });

  it("should be able to remove a skill", () => {
    const thirdSkill = skills.skills[2];

    skills.removeSkill(thirdSkill.id);

    expect(skills.count).toEqual(2);
  });

  it("should not be able to delete a invalid skill", () => {
    expect(() => skills.removeSkill("invalid-id")).toThrowError(
      SkillNotFoundError,
    );
    expect(() => skills.removeSkill("invalid-id")).toThrowError(
      "Skill not founded",
    );
  });
});
