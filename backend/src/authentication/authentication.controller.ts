import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { JwtGuard } from './guards/jwt.guard'
// import { Request } from 'express'
import { UserEntity } from '@/users/entities/user.entity'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  private signUp(@Body() body: SignUpDto) {
    return this.authenticationService.signUp(body)
  }

  @Post('sign-in')
  private signIn(@Body() body: SignInDto) {
    return this.authenticationService.signIn(body)
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  private refresh(@Req() { user }: { user: UserEntity }) {
    return this.authenticationService.refresh(user)
  }
}
