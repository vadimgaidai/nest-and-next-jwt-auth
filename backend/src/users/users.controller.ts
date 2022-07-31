import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  UnauthorizedException,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtGuard } from '@/authentication/guards/jwt.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Headers('Authorization') auth: string) {
    let token = null
    if (typeof auth != 'undefined') {
      token = auth.replace('Bearer ', '')
    }
    if (!token) {
      throw new UnauthorizedException('No Token provided!')
    }
    return this.usersService.me({ token })
  }

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
