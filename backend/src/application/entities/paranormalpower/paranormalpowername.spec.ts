import { InvalidParanormalPowerNameError } from "@application/auth/errors/invalid-paranormal-power-name.error";
import { ParanormalPowerName } from "./paranormalpowername";

describe("Paranormalpower name object value", () => {
  it("should be able to create an instance", () => {
    expect(new ParanormalPowerName("valid name").value).toEqual("valid name");
  });

  it("should not be able to create an instance with an invalid name", () => {
    expect(() => new ParanormalPowerName("")).toThrow(
      InvalidParanormalPowerNameError,
    );
    expect(() => new ParanormalPowerName("    ")).toThrow(
      InvalidParanormalPowerNameError,
    );
  });
});
