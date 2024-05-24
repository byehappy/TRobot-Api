import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as process from 'process';
import { UserService } from '../../user/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SecretJWT,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { login: string; }) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const user = await this.userService.getUserByLogin(payload.login);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return { ...payload, refreshToken, user };
  }
}
