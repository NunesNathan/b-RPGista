import { ActionType } from "@prisma/client";
import { Effects } from "@application/entities/effect/effects";
import { Skill, SkillProps } from "@application/entities/skill/skill";
import { SkillName } from "@application/entities/skill/skill-name";
import { Skills } from "@application/entities/skill/skills";

type Override = Partial<SkillProps>;

export class SkillsFactory {
  static skill(override: Override = {}): Skill {
    return new Skill({
      name: new SkillName("test").value,
      description: "test description",
      action: ActionType.FREE,
      effect: new Effects([]),
      creatorId: "creator-id",
      ...override,
    });
  }

  static skills(override: Skill[] = []): Skills {
    const skills = new Skills([
      this.skill(),
      this.skill({ action: ActionType.MOVE }),
    ]);

    if (override) {
      override.forEach((skill) => skills.addSkill(skill));
    }

    return skills;
  }
}
