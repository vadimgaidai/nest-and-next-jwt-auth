import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { UserEntity } from '@/users/entities/user.entity'

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
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(decoded: any): Promise<UserEntity> {
    return this.authRepository.findOne(decoded.id)
  }

  public async isHashValid(data: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(data, hash)
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

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: Date.now() / 1000 + Number(process.env.JWT_EXPIRES),
    }
  }

  public async encode(data: string, saltValue = 10): Promise<string> {
    const salt: string = await bcrypt.genSaltSync(saltValue)
    return bcrypt.hashSync(data, salt)
  }

  public async verifyToken({ token, secret }: RefreshTokenDto): Promise<UserEntity | never> {
    try {
      const decoded: DecodeToken = await this.jwtService.verifyAsync(token, {
        secret,
      })
      if (!decoded) {
        throw new UnauthorizedException()
      }
      const user: UserEntity = await this.validateUser(decoded)
      if (!user) {
        throw new UnauthorizedException()
      }
      return user
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
