import { InvalidSkillNameError } from "@application/auth/errors/invalid-skill-name.error";

export class SkillName {
  private readonly skillName: string;

  private validator(skillName: string) {
    return (
      skillName.replace(/\s/g, "").length >= 3 &&
      skillName.length <= 36 &&
      skillName.match(/[.\s\w]/g)?.join("") === skillName
    );
  }

  constructor(skillName: string) {
    const isValidSkillName = this.validator(skillName);

    if (!isValidSkillName) {
      throw new InvalidSkillNameError();
    }

    this.skillName = skillName;
  }

  public get value(): string {
    return this.skillName;
  }
}
