import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { UserEntity } from '@/users/entities/user.entity'

@Injectable()
export class JwtGuard extends Guard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: UserEntity): any {
    return user
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const { user }: Request = context.switchToHttp().getRequest()

    return !!user
  }
}
