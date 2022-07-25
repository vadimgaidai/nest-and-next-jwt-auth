import { IsOptional, IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString()
  token: string

  @IsString()
  @IsOptional()
  secret?: string
}
