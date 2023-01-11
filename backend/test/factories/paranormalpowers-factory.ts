import { ActionType } from "@prisma/client";
import {
  ParanormalPowerProps,
  ParanormalPower,
} from "@application/entities/paranormalpower/paranormalpower";
import { ParanormalPowerName } from "@application/entities/paranormalpower/paranormalpowername";
import { ParanormalPowers } from "@application/entities/paranormalpower/paranormalpowers";
import { EffectsFactory } from "./effects-factory";

type Override = Partial<ParanormalPowerProps>;

export class ParanormalPowersFactory {
  static paranormalPower(override: Override = {}): ParanormalPower {
    return new ParanormalPower({
      name: new ParanormalPowerName("test").value,
      description: "test description",
      action: ActionType.FREE,
      effect: EffectsFactory.Effects(),
      creatorId: "creator-id",
      ...override,
    });
  }

  static paranormalPowers(override: ParanormalPower[] = []): ParanormalPowers {
    const paranormalPowers = new ParanormalPowers([
      this.paranormalPower(),
      this.paranormalPower({ action: ActionType.MOVE }),
    ]);

    if (override) {
      override.forEach((paranormalPower) =>
        paranormalPowers.addParanormalPower(paranormalPower),
      );
    }

    return paranormalPowers;
  }
}
