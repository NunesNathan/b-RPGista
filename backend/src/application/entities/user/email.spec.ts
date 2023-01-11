import { InvalidEmailError } from "@application/auth/errors/invalid-email.error";
import { Email } from "./email";

describe("Email value object", () => {
  const validEmail = "test@example.com";
  const invalidEmail = "test@/heatmail.com";

  it("should be able to create an instance", () => {
    const emailValue = new Email(validEmail);

    expect(emailValue.value).toBe(validEmail);
  });

  it("should not be able to create an instance with an invalid email", () => {
    expect(() => new Email(invalidEmail)).toThrow(InvalidEmailError);
    expect(() => new Email("")).toThrow(InvalidEmailError);
    expect(() => new Email(invalidEmail)).toThrow("Invalid email format");
  });
});
