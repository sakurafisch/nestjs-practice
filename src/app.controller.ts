import { Controller, Get, Query, Redirect, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
