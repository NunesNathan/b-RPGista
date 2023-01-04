import { SkillNotFoundError } from "@application/auth/errors/skill-not-found.error";
import { Skill } from "./skill";

export interface SkillsProps {
  count: number;
  skills: Skill[];
}

export class Skills {
  private props: SkillsProps;

  constructor(props: Skill[]) {
    this.props = {
      count: props.length,
      skills: props,
    };
  }

  public addSkill(skill: Skill) {
    this.props.skills.push(skill);
    this.props.count = this.props.skills.length;
  }

  public removeSkill(skillId: string) {
    let hasChanged = false;

    this.props.skills = this.props.skills.filter(
      (skill) => skill.id !== skillId && (hasChanged = true),
    );

    if (!hasChanged) {
      throw new SkillNotFoundError();
    }

    this.props.count = this.props.skills.length;
  }

  public get skills(): Skill[] {
    return this.props.skills;
  }

  public get count(): number {
    return this.props.count;
  }
}
