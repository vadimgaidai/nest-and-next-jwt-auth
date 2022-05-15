import { Trim } from 'class-sanitizer'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @Trim()
  @IsEmail()
  public readonly email: string

  @IsString()
  @MinLength(8)
  public readonly password: string

  @IsString()
  @IsOptional()
  public readonly name?: string
}
