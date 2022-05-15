import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '@/users/entities/user.entity'
import * as bcrypt from 'bcryptjs'

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

  public generateToken({ id, email }: UserEntity): string {
    return this.jwtService.sign({ id, email })
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword)
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
  }

  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwtService.verify(token)

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    const user: UserEntity = await this.validateUser(decoded)

    if (!user) {
      throw new UnauthorizedException()
    }

    return true
  }
}
