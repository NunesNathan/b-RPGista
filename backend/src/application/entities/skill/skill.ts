import { randomUUID } from "node:crypto";
import { ActionType } from "@prisma/client";
import { InvalidActionTypeError } from "@application/auth/errors/invalid-action-type.error";
import { PrerequisiteNotFoundError } from "@application/auth/errors/prerequisite-not-found.error";
import { Replace } from "@helpers/replace";
import { Effect, Effects } from "../effect/effects";
import { Prerequisite } from "../prerequisite/prerequisite";
import { SkillName } from "./skill-name";

export interface SkillProps {
  id: string;
  name: string;
  prerequisites: Prerequisite[];
  description: string;
  action: ActionType;
  effect: Effects;
  creatorId: string;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Skill {
  private props: SkillProps;

  constructor(
    props: Replace<
      SkillProps,
      {
        id?: string;
        name: string;
        prerequisites?: Prerequisite[];
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
      name: new SkillName(props.name).value,
      prerequisites: props.prerequisites ?? [],
      effect: props.effect ?? new Effects([]),
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
    return this.props.name;
  }

  public get prerequisites(): Prerequisite[] {
    return this.props.prerequisites ?? [];
  }

  public addPrerequisite(prerequisite: Prerequisite): void {
    this.props.prerequisites = [...this.props.prerequisites, prerequisite];
    this.props.updatedAt = new Date();
  }

  public removePrerequisite(prerequisiteId: string): void {
    let hasChanged = false;

    this.props.prerequisites = this.props.prerequisites.filter(
      (prerequisite) => {
        if (prerequisite.prerequisiteId !== prerequisiteId) {
          return prerequisite;
        }
        hasChanged = true;
      },
    );

    if (!hasChanged) {
      throw new PrerequisiteNotFoundError();
    }

    this.props.updatedAt = new Date();
  }

  public get description(): string {
    return this.props.description;
  }

  public changeDescription(description: string): void {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  public get action(): ActionType {
    return this.props.action;
  }

  public changeAction(action: string): void {
    if (
      Object.values(ActionType).includes(action.toUpperCase() as ActionType)
    ) {
      this.props.action = action.toUpperCase() as ActionType;
      this.props.updatedAt = new Date();
    } else {
      throw new InvalidActionTypeError();
    }
  }

  public get effect(): Effect[] {
    return this.props.effect.value;
  }

  public addSkillEffect(skillEffect: Effect): void {
    this.props.effect.addEffect(skillEffect);
    this.props.updatedAt = new Date();
  }

  public removeSkillEffect(skillEffectId: string): void {
    this.props.effect.removeEffect(skillEffectId);
    this.props.updatedAt = new Date();
  }

  public effectsCount(): number {
    return this.props.effect.count;
  }

  public get literalEffects(): Effects {
    return this.props.effect.this;
  }

  public get creatorId(): string {
    return this.props.creatorId;
  }

  public addView() {
    this.props.views += 1;
  }

  public get views(): number {
    return this.props.views;
  }

  public addFavorite() {
    this.props.favorites += 1;
  }

  public removeFavorite() {
    this.props.favorites -= 1;
  }

  public get favorites(): number {
    return this.props.favorites;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
