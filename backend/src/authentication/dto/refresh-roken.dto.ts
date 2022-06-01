import { IsNumber, IsOptional, IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsNumber()
  @IsOptional()
  user_id: number

  @IsString()
  refresh_token: string
}
