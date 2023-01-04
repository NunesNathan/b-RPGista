import { InvalidSkillNameError } from "@application/auth/errors/invalid-skill-name.error";

export class SkillName {
  private readonly skillName: string;

  private validator(skillName: string) {
    return skillName.length >= 2 && skillName.length <= 36;
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
