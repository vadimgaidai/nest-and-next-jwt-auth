import { Trim } from 'class-sanitizer'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @Trim()
  @IsEmail()
  public readonly email: string

  @MinLength(8)
  @IsString()
  public readonly password: string
}
