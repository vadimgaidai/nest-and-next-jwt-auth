import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserEntity } from '@/users/entities/user.entity'

import { AuthenticationHelpers } from '@/authentication/authentication.helpers'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthenticationHelpers)
  private readonly authenticationHelpers: AuthenticationHelpers

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
      ignoreExpiration: false,
    })
  }

  private validate(payload: string): Promise<UserEntity | never> {
    return this.authenticationHelpers.validateUser(payload)
  }
}
