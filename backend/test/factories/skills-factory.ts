import { ActionType } from "@prisma/client";
import { Effects } from "@application/entities/effect/effects";
import { Skill, SkillProps } from "@application/entities/skill/skill";
import { SkillName } from "@application/entities/skill/skillname";

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
}
