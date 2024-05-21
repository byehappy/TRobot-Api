import {
  CanActivate, ExecutionContext,
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
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const token = authHeader.split(' ')[1];
      const user = this.jwtService.verify(token);
      req.user = user;

      if (user.role !== Role.ADMIN && user.role !== Role.TEACHER) {
        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
