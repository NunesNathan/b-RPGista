import { InvalidCharacterNameError } from "@application/auth/errors/invalid-character-name.error";
import { CharacterName } from "./character-name";

describe("Character name value object", () => {
  const validCharacterName = "characterName";
  const numericValidCharacterName = "1s4r";
  const smallerInvalidCharacterName = "cha";
  const biggerInvalidCharacterName = "a".repeat(29);
  const invalidCharacterName = "invalid character name";
  const invalidCharactersCharacterName = "U$ern@ame";
  const validCharacterNameUppercase = validCharacterName.toUpperCase();

  it("should be able to create an instance", () => {
    expect(new CharacterName(validCharacterName).value).toEqual(
      validCharacterName,
    );
    expect(new CharacterName(numericValidCharacterName).value).toEqual(
      numericValidCharacterName,
    );
  });

  it("should be able to edite an instance", () => {
    expect(
      new CharacterName(validCharacterName, validCharacterNameUppercase).value,
    ).toEqual(validCharacterName);
  });

  it("should not be able to create an instance with an invalid character name", () => {
    expect(() => new CharacterName(invalidCharacterName)).toThrow(
      InvalidCharacterNameError,
    );
    expect(() => new CharacterName("")).toThrow(InvalidCharacterNameError);
    expect(() => new CharacterName(invalidCharacterName)).toThrow(
      "Invalid character name format",
    );
  });

  it("should not be able to create an instance with an invalid characters character name", () => {
    expect(() => new CharacterName(invalidCharactersCharacterName)).toThrow(
      InvalidCharacterNameError,
    );
  });

  it("should not be able to create an instance with an invalid character name size", () => {
    expect(() => new CharacterName(smallerInvalidCharacterName)).toThrow(
      InvalidCharacterNameError,
    );
    expect(() => new CharacterName(biggerInvalidCharacterName)).toThrow(
      InvalidCharacterNameError,
    );
  });
});
