import { randomUUID } from "node:crypto";
import { Class as CharacterClass } from "@prisma/client";
import { InvalidCharacterClassError } from "@application/auth/errors/invalid-character-class.error";
import { InvalidCharacterNameError } from "@application/auth/errors/invalid-character-name.error";
import { InvalidNexError } from "@application/auth/errors/invalid-nex.error";
import { Replace } from "@helpers/replace";
import { CharacterName } from "./charactername";
import { ParanormalPower } from "../paranormalpower/paranormalpower";
import { ParanormalPowers } from "../paranormalpower/paranormalpowers";
import { Skill } from "../skill/skill";
import { Skills } from "../skill/skills";

export interface CharacterProps {
  id: string;
  name: CharacterName;
  description: string;
  nex: number;
  class: CharacterClass;
  actions: Skills;
  paranormalPowers: ParanormalPowers;
  creatorId: string;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Character {
  private props: CharacterProps;

  constructor(
    props: Replace<
      CharacterProps,
      {
        id?: string;
        actions?: Skills;
        paranormalPowers?: ParanormalPowers;
        views?: number;
        favorites?: number;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
  ) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      actions: props.actions ?? new Skills([]),
      paranormalPowers: props.paranormalPowers ?? new ParanormalPowers([]),
      views: props.views ?? 0,
      favorites: props.favorites ?? 0,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public changeName(name: string) {
    const changedName = new CharacterName(name, this.props.name.value);

    if (this.props.name === changedName) {
      throw new InvalidCharacterNameError();
    }

    this.props.name = changedName;
  }

  public get description(): string {
    return this.props.description;
  }

  public changeDescription(description: string) {
    this.props.description = description;
  }

  public get nex(): number {
    return this.props.nex;
  }

  public changeNex(nex: number) {
    if (nex >= 0 && nex < 100) {
      if (nex === 0 || nex % 5 === 0 || nex === 99) {
        this.props.nex = nex;
        return;
      }
    }

    throw new InvalidNexError();
  }

  public get class(): string {
    return this.props.class;
  }

  public changeClass(characterClass: string) {
    if (
      Object.values(CharacterClass).includes(
        characterClass.toUpperCase() as CharacterClass,
      )
    ) {
      this.props.class = characterClass as CharacterClass;
    } else {
      throw new InvalidCharacterClassError();
    }
  }

  public get actions(): Skills {
    return this.props.actions;
  }

  public get actionsList(): Skill[] {
    return this.props.actions.skills;
  }

  public get actionsCount(): number {
    return this.props.actions.count;
  }

  public addAction(action: Skill) {
    this.props.actions.addSkill(action);
  }

  public removeAction(actionId: string) {
    this.props.actions.removeSkill(actionId);
  }

  public get paranormalPowers(): ParanormalPowers {
    return this.props.paranormalPowers;
  }

  public get paranormalPowersList(): ParanormalPower[] {
    return this.props.paranormalPowers.powers;
  }

  public get paranormalPowersCount(): number {
    return this.props.paranormalPowers.count;
  }

  public addParanormalPower(paranormalPower: ParanormalPower) {
    this.props.paranormalPowers.addParanormalPower(paranormalPower);
  }

  public removeParanormalPower(paranormalPower: string) {
    this.props.paranormalPowers.removeParanormalPower(paranormalPower);
  }

  public get creatorId(): string {
    return this.props.creatorId;
  }

  public get views(): number {
    return this.props.views;
  }

  public addView() {
    this.props.views += 1;
  }

  public get favorites(): number {
    return this.props.favorites;
  }

  public addFavorite() {
    this.props.favorites += 1;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
