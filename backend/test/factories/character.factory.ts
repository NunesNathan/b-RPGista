import { Class } from "@prisma/client";
import {
  Character,
  CharacterProps,
} from "@application/entities/character/character";
import { CharacterName } from "@application/entities/character/character-name";
import { ParanormalPowersFactory } from "./paranormal-powers.factory";
import { SkillsFactory } from "./skills.factory";

type Override = Partial<CharacterProps>;

export class CharacterFactory {
  static char(override: Override = {}): Character {
    return new Character({
      id: "test-tester-id-1",
      name: new CharacterName("test"),
      nex: 5,
      class: Class.FIGHTER,
      creatorId: "test-tester-id",
      actions: SkillsFactory.skills(),
      paranormalPowers: ParanormalPowersFactory.paranormalPowers(),
      description: "description",
      views: 0,
      favorites: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...override,
    });
  }
}
