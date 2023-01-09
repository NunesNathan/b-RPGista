import { Replace } from "@helpers/replace";
import { randomUUID } from "node:crypto";

export enum PrerequisiteType {
  ATTRIBUTE = "ATTRIBUTE",
  ANOTHER_SKILL = "ANOTHER_SKILL",
  ANOTHER_PARANORMAL_POWER = "ANOTHER_PARANORMAL_POWER",
  OTHER = "OTHER",
}

export interface PrerequisiteProps {
  prerequisiteId: string;
  prerequisiteType: PrerequisiteType;
  prerequisite: string;
}

export class Prerequisite {
  private props: PrerequisiteProps;

  constructor(props: Replace<PrerequisiteProps, { prerequisiteId?: string }>) {
    this.props = {
      ...props,
      prerequisiteId: props.prerequisiteId ?? randomUUID(),
    };
  }

  public get value(): Prerequisite {
    return this;
  }

  public get prerequisiteId(): string {
    return this.props.prerequisiteId;
  }

  public get prerequisiteType(): PrerequisiteType {
    return this.props.prerequisiteType;
  }
}
