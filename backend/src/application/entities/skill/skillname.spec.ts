import { InvalidSkillNameError } from "@application/auth/errors/invalid-skill-name.error";
import { SkillName } from "./skillname";

describe("Skillname object value", () => {
  it("should be able to create an instance", () => {
    expect(new SkillName("new skill name").value).toEqual("new skill name");
    expect(new SkillName("02 skill").value).toEqual("02 skill");
  });

  it("should not be able to create an instance with an invalid skillname", () => {
    expect(() => new SkillName("")).toThrow(InvalidSkillNameError);
    expect(() => new SkillName("l@rr$")).toThrow(InvalidSkillNameError);
    expect(() => new SkillName("    ")).toThrow(InvalidSkillNameError);
  });

  it("should not be able to create an instance with an invalid skillname size", () => {
    expect(() => new SkillName("a")).toThrow(InvalidSkillNameError);

    expect(() => new SkillName("a".repeat(40))).toThrow(InvalidSkillNameError);
  });
});
