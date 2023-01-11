import { PrerequisiteFactory } from "@test/factories/prerequisite.factory";
import { Prerequisite, PrerequisiteType } from "./prerequisite";

describe("Prerequisite value object", () => {
  const prerequisite = PrerequisiteFactory.prerequisite();

  it("should be able to create an instance", () => {
    expect(prerequisite).toBeInstanceOf(Prerequisite);
    expect(prerequisite.prerequisiteId).toBeDefined();
    expect(prerequisite.prerequisiteType).toEqual(
      PrerequisiteType.ANOTHER_SKILL,
    );
  });
});
