import { ActionType } from "@prisma/client";
import { Effects } from "@application/entities/effect/effects";
import { Skill, SkillProps } from "@application/entities/skill/skill";
import { SkillName } from "@application/entities/skill/skillname";
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
    const paranormalPowers = new Skills([
      this.skill(),
      this.skill({ action: ActionType.FREE }),
    ]);

    if (override) {
      override.forEach((paranormalPower) =>
        paranormalPowers.addSkill(paranormalPower),
      );
    }

    return paranormalPowers;
  }
}
