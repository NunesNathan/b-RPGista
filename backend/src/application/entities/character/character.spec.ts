import { InvalidCharacterClassError } from "@application/auth/errors/invalid-character-class.error";
import { InvalidNexError } from "@application/auth/errors/invalid-nex.error";
import { ActionType, Class } from "@prisma/client";
import { CharacterFactory } from "@test/factories/character.factory";
import { ParanormalPowersFactory } from "@test/factories/paranormal-powers.factory";
import { SkillsFactory } from "@test/factories/skills.factory";
import { Character } from "./character";
import { ParanormalPowers } from "../paranormalpower/paranormal-powers";
import { Skills } from "../skill/skills";

describe("Character entity", () => {
  const character = CharacterFactory.char();
  it("should be able to create an instance", () => {
    expect(character).toBeInstanceOf(Character);
    expect(character.id).toBeDefined();
    expect(character.name).toEqual("test");
    expect(character.description).toEqual("description");
    expect(character.nex).toEqual(5);
    expect(character.class).toEqual("FIGHTER");
    expect(character.actions).toBeInstanceOf(Skills);
    expect(character.actionsList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ action: ActionType.MOVE }),
        expect.objectContaining({ action: ActionType.FREE }),
      ]),
    );
    expect(character.actionsCount).toEqual(2);
    expect(character.paranormalPowers).toBeInstanceOf(ParanormalPowers);
    expect(character.paranormalPowersList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ action: ActionType.MOVE }),
        expect.objectContaining({ action: ActionType.FREE }),
      ]),
    );
    expect(character.paranormalPowersCount).toEqual(2);
    expect(character.creatorId).toEqual("test-tester-id");
    expect(character.views).toEqual(0);
    expect(character.favorites).toEqual(0);
    expect(character.createdAt).toBeInstanceOf(Date);
    expect(character.updatedAt).toBeInstanceOf(Date);
  });

  it("should be able to change name", () => {
    character.changeName("Test");

    expect(character.name).toBe("Test");
  });

  it("should be able to change description", () => {
    character.changeDescription("Description");

    expect(character.description).toBe("Description");
  });

  it("should be able to change nex", () => {
    character.changeNex(0);
    character.changeNex(30);
    character.changeNex(45);
    character.changeNex(55);

    expect(character.nex).toBe(55);
  });

  it("should not be able to change to invalid nex", () => {
    expect(() => character.changeNex(9)).toThrowError(InvalidNexError);
    expect(() => character.changeNex(19)).toThrowError(InvalidNexError);
    expect(() => character.changeNex(13)).toThrowError(
      "Nex must be exactly 0, a multiple of 5 or exactly 99",
    );
    expect(() => character.changeNex(92)).toThrowError(InvalidNexError);
    expect(() => character.changeNex(100)).toThrowError(InvalidNexError);
  });

  it("should be able to change class", () => {
    character.changeClass(Class.OCCULTIST);

    expect(character.class).toBe("OCCULTIST");
  });

  it("should not be able to change to invalid class", () => {
    expect(() => character.changeClass("Invalid")).toThrowError(
      InvalidCharacterClassError,
    );
    expect(() => character.changeClass("Invalid")).toThrowError(
      "Invalid character class",
    );
  });

  it("should be able to add an action", () => {
    character.addAction(SkillsFactory.skill());

    expect(character.actionsCount).toBe(3);
  });

  it("should be able to remove an action", () => {
    const skill = character.actionsList[2];

    character.removeAction(skill.id);

    expect(character.actionsCount).toBe(2);
  });

  it("should be able to add a paranormal power", () => {
    character.addParanormalPower(ParanormalPowersFactory.paranormalPower());

    expect(character.paranormalPowersCount).toBe(3);
  });

  it("should be able to remove a paranormal power", () => {
    const power = character.paranormalPowersList[2];

    character.removeParanormalPower(power.id);

    expect(character.paranormalPowersCount).toBe(2);
  });

  it("should be able to add a view", () => {
    character.addView();

    expect(character.views).toBe(1);
  });

  it("should be able to add a favorite", () => {
    character.addFavorite();

    expect(character.favorites).toBe(1);
  });

  it("should be able to remove a favorite", () => {
    character.removeFavorite();

    expect(character.favorites).toBe(0);
  });
});
