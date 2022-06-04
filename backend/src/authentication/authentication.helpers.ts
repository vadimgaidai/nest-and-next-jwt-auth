import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { UserEntity } from '@/users/entities/user.entity'
import { RefreshTokenEntity } from './entities/refresh-token.entity'

import { RefreshTokenDto } from './dto/refresh-token.dto'

interface DecodeToken {
  id: string
  email: string
  iat: number
  exp: number
}
@Injectable()
export class AuthenticationHelpers {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(decoded: any): Promise<UserEntity> {
    return this.authRepository.findOne(decoded.id)
  }

  public async isHashValid(data: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(data, hash)
  }

  // Saved bcrypt refresh_token in DB with user id
  public async saveRefreshToken({ user_id, refresh_token: refreshToken }: RefreshTokenDto) {
    const payload: RefreshTokenEntity = await this.refreshTokenRepository.findOne({
      where: {
        user_id,
      },
    })
    const token = new RefreshTokenEntity()
    token.user_id = user_id
    token.refresh_token = await this.encode(refreshToken)
    if (!payload) {
      await this.refreshTokenRepository.save(token)
      return
    }
    await this.refreshTokenRepository.update(payload.id, token)
  }

  public async issueTokensPair({ id, email }: UserEntity) {
    const data = { id, email }

    const accessToken = await this.jwtService.signAsync(data, {
      secret: process.env.JWT_KEY,
      expiresIn: Number(process.env.JWT_EXPIRES),
    })

    const refreshToken = await this.jwtService.signAsync(data, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRES),
    })

    await this.saveRefreshToken({
      user_id: id,
      refresh_token: refreshToken,
    })

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: Number(process.env.JWT_EXPIRES) * 1000,
    }
  }

  public async encode(data: string, saltValue = 10): Promise<string> {
    const salt: string = await bcrypt.genSaltSync(saltValue)
    return bcrypt.hashSync(data, salt)
  }

  public async verifyRefreshToken({
    refresh_token: refreshToken,
  }: RefreshTokenDto): Promise<UserEntity | never> {
    try {
      const decoded: DecodeToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_KEY,
      })

      const user: UserEntity = await this.validateUser(decoded)
      if (!user) {
        throw new UnauthorizedException()
      }

      const dbToken: RefreshTokenEntity = await this.refreshTokenRepository.findOne({
        where: {
          user_id: user.id,
        },
      })
      const isHashValid: boolean = await this.isHashValid(refreshToken, dbToken.refresh_token)
      if (!isHashValid) {
        throw new UnauthorizedException()
      }

      return user
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
