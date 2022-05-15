import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

import { UserEntity } from '@/users/entities/user.entity'
import { AuthenticationModule } from '@/authentication/authentication.module'
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthenticationModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
