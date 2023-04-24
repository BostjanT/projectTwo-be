import { Body, Controller, Post } from '@nestjs/common';

@Controller('email')
export class EmailController {
  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    const token = Math.random().toString(20).substring(2, 12);
  }
}
