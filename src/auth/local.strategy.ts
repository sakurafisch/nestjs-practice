import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStragegy extends PassportStrategy(Strategy) {
  constructor(private authServie: AuthService) {
    super(); // We can pass an options object in the call to super() to customize the behavior of the passport strategy.  for example: super({ usernameField: 'email' }). See the Passport documentation for more information.
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authServie.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
