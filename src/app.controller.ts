import {
  Controller,
  Get,
  Query,
  Redirect,
  HttpStatus,
  UseGuards,
  Post,
  Request,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('docs')
  @Redirect('https://nestjs.com', HttpStatus.MOVED_PERMANENTLY)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return {
        url: 'https://docs.nestjs.com/v5',
        statusCode: HttpStatus.MOVED_PERMANENTLY,
      };
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
