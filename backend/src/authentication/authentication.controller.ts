import {
  Controller,
  Post,
  Body,
  Headers,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

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
  private refresh(@Headers('Authorization') auth: string) {
    let token = null
    if (typeof auth != 'undefined') {
      token = auth.replace('Bearer ', '')
    }
    if (!token) {
      throw new UnauthorizedException('No Token provided!')
    }
    return this.authenticationService.refresh({ token })
  }
}
