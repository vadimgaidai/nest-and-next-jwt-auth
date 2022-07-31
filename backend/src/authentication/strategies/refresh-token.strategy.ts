import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserEntity } from '@/users/entities/user.entity'

import { AuthenticationHelpers } from '@/authentication/authentication.helpers'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  @Inject(AuthenticationHelpers)
  private readonly authenticationHelpers: AuthenticationHelpers

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: process.env.JWT_REFRESH_KEY,
      ignoreExpiration: false,
    })
  }

  private async validate(payload: string): Promise<UserEntity | never> {
    return this.authenticationHelpers.validateUser(payload)
  }
}
