/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

import { UserEntity } from '@/users/entities/user.entity'
import { AuthenticationHelpers } from './authentication.helpers'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
    private readonly helpers: AuthenticationHelpers
  ) {}

  async signUp({ name, email, password }: SignUpDto) {
    let user: UserEntity = await this.authRepository.findOne({ where: { email } })
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT)
    }

    user = new UserEntity()
    user.name = name
    user.email = email
    user.password = await this.helpers.encode(password)

    await this.authRepository.save(user)
    const tokens = await this.helpers.issueTokensPair(user)
    return tokens
  }

  async signIn({ email, password }: SignInDto) {
    const user: UserEntity = await this.authRepository.findOne({ where: { email } })
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND)
    }
    const isHashValid: boolean = await this.helpers.isHashValid(password, user.password)
    if (!isHashValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND)
    }
    this.authRepository.update(user.id, {})
    const tokens = await this.helpers.issueTokensPair(user)
    return tokens
  }

  async refresh({ token }: RefreshTokenDto) {
    const user = await this.helpers.verifyToken({
      token,
      secret: process.env.JWT_REFRESH_KEY,
    })
    const tokens = await this.helpers.issueTokensPair(user)
    return tokens
  }
}
