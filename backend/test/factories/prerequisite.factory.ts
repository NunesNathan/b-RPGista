import {
  Prerequisite,
  PrerequisiteProps,
  PrerequisiteType,
} from "@application/entities/prerequisite/prerequisite";

type Override = Partial<PrerequisiteProps>;

export class PrerequisiteFactory {
  static prerequisite(override: Override = {}): Prerequisite {
    return new Prerequisite({
      prerequisite: "prerequisite-name",
      prerequisiteType: PrerequisiteType.ANOTHER_SKILL,
      ...override,
    });
  }
}
