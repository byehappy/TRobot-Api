import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PurchaseService } from '../../purchase/purchase.service';

@Injectable()
export class CourseAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly purchaseService: PurchaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Получаем заголовок Authorization с токеном
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Токен отсутствует');
    }

    // Извлекаем токен из заголовка
    const token = authHeader.split(' ')[1];

    try {
      // Расшифровываем токен для получения информации о пользователе
      const decodedToken = this.jwtService.verify(token);

      // Получаем ID пользователя из токена
      const userId = decodedToken.id;

      // Проверяем, есть ли у пользователя доступ к курсу
      const courseId = request.params.id; // Предполагается, что courseId передается в параметрах запроса
      const hasAccess = await this.checkCourseAccess(userId, courseId);

      return hasAccess;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async checkCourseAccess(userId: string, courseId: string): Promise<boolean> {
    // Получаем информацию о покупках пользователя
    const userPurchases = await this.purchaseService.findAll(userId);

    // Проверяем, имеется ли курс в списке покупок пользователя
    return userPurchases.some(purchase => purchase.courseId == courseId);
  }
}
