import { Injectable } from '@nestjs/common'
import { CreateAuthenticationDto } from './dto/create-authentication.dto'

@Injectable()
export class AuthenticationService {
  login(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication'
  }

  register() {
    return `This action returns all authentication`
  }
}
