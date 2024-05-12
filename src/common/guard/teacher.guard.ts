import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = this.extractAuthToken(context);

      const user = this.jwtService.verify(token);
      context.switchToHttp().getRequest().user = user;
      if (user.role !== Role.ADMIN || user.role !== Role.TEACHER){
        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
      }
      return true
    } catch (error) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
  private extractAuthToken(context: ExecutionContext): string {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    return authHeader.split(' ')[1];
  }
}
