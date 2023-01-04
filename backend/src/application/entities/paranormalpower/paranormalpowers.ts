import { ParanormalPowerNotFoundError } from "@application/auth/errors/paranormal-power-not-found.error";
import { ParanormalPower } from "./paranormalpower";

export interface ParanormalPowersProps {
  count: number;
  powers: ParanormalPower[];
}

export class ParanormalPowers {
  private props: ParanormalPowersProps;

  constructor(props: ParanormalPower[]) {
    this.props = {
      count: props.length,
      powers: props,
    };
  }

  public addParanormalPower(skill: ParanormalPower) {
    this.props.powers.push(skill);
    this.props.count = this.props.powers.length;
  }

  public removeParanormalPower(skillId: string) {
    let hasChanged = false;

    this.props.powers = this.props.powers.filter(
      (skill) => skill.id !== skillId && (hasChanged = true),
    );

    if (!hasChanged) {
      throw new ParanormalPowerNotFoundError();
    }

    this.props.count = this.props.powers.length;
  }

  public get powers(): ParanormalPower[] {
    return this.props.powers;
  }

  public get count(): number {
    return this.props.count;
  }
}
