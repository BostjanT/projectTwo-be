import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from 'src/auth/dto/SignUpDto.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getUser(@CurrentUser() user: User) {
    return this.userService.getUser(user.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createUserDto: SignUpDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
