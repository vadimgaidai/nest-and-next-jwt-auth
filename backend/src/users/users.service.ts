import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from '@/users/entities/user.entity'
import { AuthenticationHelpers } from '@/authentication/authentication.helpers'
import { RefreshTokenDto } from '@/authentication/dto/refresh-token.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly helpers: AuthenticationHelpers
  ) {}

  async me({ token }: RefreshTokenDto) {
    const user = await this.helpers.verifyToken({ token, secret: process.env.JWT_KEY })
    if (!user) {
      throw new NotFoundException('User is not found')
    }
    return user
  }
  async findAll() {
    const users = await this.usersRepository.find()
    return users
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException('User is not found')
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException('User is not found')
    }
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException('User is not found')
    }
    await this.usersRepository.delete(id)
  }
}
