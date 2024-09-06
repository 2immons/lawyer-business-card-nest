import {
  Body,
  Controller,
  Get,
  Post, Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Get('login')
  login(@Query() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
