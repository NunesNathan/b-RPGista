import { InvalidUsernameError } from "@application/auth/errors/invalid-username.error";
import { Username } from "./username";

describe("Username value object", () => {
  const validUsername = "userName";
  const numericValidUsername = "1s4r";
  const smallerInvalidUsername = "use";
  const biggerInvalidUsername = "usernameusernameusername";
  const invalidUsername = "invalid username";
  const invalidCharactersUsername = "U$ern@ame";

  it("should be able to create an instance", () => {
    expect(new Username(validUsername).value).toEqual(validUsername);
    expect(new Username(numericValidUsername).value).toEqual(
      numericValidUsername,
    );
  });

  it("should not be able to create an instance with an invalid username", () => {
    expect(() => new Username(invalidUsername)).toThrow(InvalidUsernameError);
    expect(() => new Username("")).toThrow(InvalidUsernameError);
    expect(() => new Username(invalidUsername)).toThrow(
      "Invalid username format",
    );
  });

  it("should not be able to create an instance with an invalid characters username", () => {
    expect(() => new Username(invalidCharactersUsername)).toThrow(
      InvalidUsernameError,
    );
  });

  it("should not be able to create an instance with an invalid username size", () => {
    expect(() => new Username(smallerInvalidUsername)).toThrow(
      InvalidUsernameError,
    );
    expect(() => new Username(biggerInvalidUsername)).toThrow(
      InvalidUsernameError,
    );
  });
});
