import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/users/entities/user.entity'
import * as bcrypt from 'bcryptjs'
import { RefreshTokenDto } from './dto/refresh-roken.dto'

@Injectable()
export class AuthenticationHelpers {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null)
  }

  public async validateUser(decoded: any): Promise<UserEntity> {
    return this.authRepository.findOne(decoded.id)
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword)
  }

  public async issueTokensPair({ id, email }: UserEntity) {
    const data = { id, email }

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '60s', // Number(process.env.JWT_EXPIRES)
    })

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '120s', // Number(process.env.JWT_REFRESH_EXPIRES)
    })

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 60 * 1000, // Number(process.env.JWT_EXPIRES) * 1000
    }
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
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
