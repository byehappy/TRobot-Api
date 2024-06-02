import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MockAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(conresponse: ExecutionContext): boolean {
    const request = conresponse.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token, { secret: 'test_secret' });
      request.user = payload;
      return true;
    } catch (error) {
      return false;
    }
  }
}