import { InvalidCharacterNameError } from "@application/auth/errors/invalid-character-name.error";

export class CharacterName {
  private readonly characterName: string;

  private validator(characterName: string) {
    return (
      characterName.length >= 4 &&
      characterName.length <= 28 &&
      characterName.match(/[^.\W]/g)?.join("") === characterName
    );
  }

  constructor(characterName: string, oldCharacterName: string | null = null) {
    if (oldCharacterName) {
      if (characterName.toLowerCase() !== oldCharacterName.toLowerCase()) {
        throw new InvalidCharacterNameError();
      }
    }

    const isValidCharacterName = this.validator(characterName);

    if (!isValidCharacterName) {
      throw new InvalidCharacterNameError();
    }

    this.characterName = characterName;
  }

  public get value(): string {
    return this.characterName;
  }
}
