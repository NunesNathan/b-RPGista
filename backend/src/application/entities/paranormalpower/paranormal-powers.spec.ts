import { ParanormalPowerNotFoundError } from "@application/auth/errors/paranormal-power-not-found.error";
import { ParanormalPowersFactory } from "@test/factories/paranormal-powers.factory";
import { ParanormalPowers } from "./paranormal-powers";

describe("Paranormal power value object", () => {
  const paranormalPowers = ParanormalPowersFactory.paranormalPowers();

  it("should be able to create an instance", () => {
    expect(paranormalPowers).toBeInstanceOf(ParanormalPowers);
    expect(paranormalPowers.count).toEqual(2);
    expect(paranormalPowers.powers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          creatorId: "creator-id",
        }),
        expect.objectContaining({
          creatorId: "creator-id",
        }),
      ]),
    );
  });

  it("should be able to add a skill", () => {
    paranormalPowers.addParanormalPower(
      ParanormalPowersFactory.paranormalPower(),
    );

    expect(paranormalPowers.count).toEqual(3);
  });

  it("should be able to remove a skill", () => {
    const thirdSkill = paranormalPowers.powers[2];

    paranormalPowers.removeParanormalPower(thirdSkill.id);

    expect(paranormalPowers.count).toEqual(2);
  });

  it("should not be able to delete a invalid skill", () => {
    expect(() =>
      paranormalPowers.removeParanormalPower("invalid-id"),
    ).toThrowError(ParanormalPowerNotFoundError);
    expect(() =>
      paranormalPowers.removeParanormalPower("invalid-id"),
    ).toThrowError("Paranormal power not founded");
  });
});
