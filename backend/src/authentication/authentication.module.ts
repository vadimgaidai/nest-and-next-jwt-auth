import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'

import { UserEntity } from '@/users/entities/user.entity'
import { RefreshTokenEntity } from './entities/refresh-token.entity'

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
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationHelpers, JwtStrategy],
})
export class AuthenticationModule {}
