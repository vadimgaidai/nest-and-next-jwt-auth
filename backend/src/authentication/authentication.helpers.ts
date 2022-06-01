import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { UserEntity } from '@/users/entities/user.entity'
import { RefreshTokenEntity } from './entities/refresh-token.entity'

import { RefreshTokenDto } from './dto/refresh-roken.dto'
@Injectable()
export class AuthenticationHelpers {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService
  ) {}

  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null)
  }

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
      expiresIn: '60s', // Number(process.env.JWT_EXPIRES)
    })

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '120s', // Number(process.env.JWT_REFRESH_EXPIRES)
    })

    await this.saveRefreshToken({
      user_id: id,
      refresh_token: refreshToken,
    })

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 60 * 1000, // Number(process.env.JWT_EXPIRES) * 1000
    }
  }

  public async encode(data: string): Promise<string> {
    const salt: string = await bcrypt.genSaltSync(10)
    return bcrypt.hashSync(data, salt)
  }

  public async validate({
    refresh_token: refreshToken,
  }: RefreshTokenDto): Promise<UserEntity | never> {
    const decoded: unknown = await this.jwtService.verifyAsync(refreshToken)

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    const user: UserEntity = await this.validateUser(decoded)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
