import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

import { UserEntity } from '@/users/entities/user.entity'
import { AuthenticationHelpers } from './authentication.helpers'
import { RefreshTokenDto } from './dto/refresh-roken.dto'

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
    user.password = this.helpers.encodePassword(password)

    await this.authRepository.save(user)
    const tokens = await this.helpers.issueTokensPair(user)
    return { user, ...tokens }
  }

  async signIn({ email, password }: SignInDto) {
    const user: UserEntity = await this.authRepository.findOne({ where: { email } })

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND)
    }

    const isPasswordValid: boolean = this.helpers.isPasswordValid(password, user.password)

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND)
    }

    this.authRepository.update(user.id, {})
    const tokens = await this.helpers.issueTokensPair(user)
    return { user, ...tokens }
  }

  async refresh(tokenDto: RefreshTokenDto) {
    const user = await this.helpers.validate(tokenDto)
    if (!user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT)
    }
    const tokens = await this.helpers.issueTokensPair(user)
    return { user, ...tokens }
  }
}
