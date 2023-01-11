import { InvalidParanormalPowerNameError } from "@application/auth/errors/invalid-paranormal-power-name.error";

export class ParanormalPowerName {
  private readonly paranormalPowerName: string;

  private validator(paranormalPowerName: string) {
    return (
      paranormalPowerName.replace(/\s/g, "").length >= 2 &&
      paranormalPowerName.length <= 36
    );
  }

  constructor(paranormalPowerName: string) {
    const isValidParanormalPowerName = this.validator(paranormalPowerName);

    if (!isValidParanormalPowerName) {
      throw new InvalidParanormalPowerNameError();
    }

    this.paranormalPowerName = paranormalPowerName;
  }

  public get value(): string {
    return this.paranormalPowerName;
  }
}
