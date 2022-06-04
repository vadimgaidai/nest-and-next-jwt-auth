import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UsePipes(new ValidationPipe())
  @Post('sign-up')
  @UseInterceptors(ClassSerializerInterceptor)
  private signUp(@Body() body: SignUpDto) {
    return this.authenticationService.signUp(body)
  }

  @UsePipes(new ValidationPipe())
  @Post('sign-in')
  private signIn(@Body() body: SignInDto) {
    return this.authenticationService.signIn(body)
  }

  @UsePipes(new ValidationPipe())
  @Post('refresh')
  private refresh(@Body() tokenDto: RefreshTokenDto) {
    return this.authenticationService.refresh(tokenDto)
  }
}
