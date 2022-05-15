import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'

import { UsersModule } from '@/users/users.module'
import { UserEntity } from '@/users/entities/user.entity'
import { JwtStrategy } from './strategies/authentication.strategy'
import { AuthenticationHelpers } from './authentication.helpers'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_KEY,
        signOptions: { expiresIn: process.env.JWT_EXPIRES },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationHelpers, JwtStrategy],
})
export class AuthenticationModule {}
