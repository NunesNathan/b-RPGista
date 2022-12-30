import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(4, 16)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `The password can only contain letters, numbers.
    Need to contains a lower case letter and one upper case letter.`,
  })
  password: string;
}
