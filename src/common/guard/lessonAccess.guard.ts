import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PurchaseService } from '../../purchase/purchase.service';
import { LessonsService } from '../../lessons/lessons.service';
import { CoursesService } from '../../courses/courses.service';

@Injectable()
export class LessonAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly purchaseService: PurchaseService,
    private readonly lessonService: LessonsService,
    private readonly courseService: CoursesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Получаем userId из токена
    const userId = this.getUserIdFromToken(request);

    // Получаем id урока из параметров запроса
    const lessonId = request.params.id;

    // Проверяем доступ пользователя к уроку
    const hasAccess = await this.checkLessonAccess(userId, lessonId);

    if (!hasAccess) {
      throw new UnauthorizedException('Недостаточно прав для доступа к уроку');
    }

    return true;
  }

  private getUserIdFromToken(request: any): string {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Токен отсутствует');
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = this.jwtService.verify(token);

    return decodedToken.id;
  }

  private async checkLessonAccess(userId: string, lessonId: string): Promise<boolean> {
    try {
      // Получаем информацию о уроке
      const lesson = await this.lessonService.findOne(lessonId);

      // Получаем информацию о курсе, к которому принадлежит урок
      const course = await this.courseService.findOne(lesson.courseId);

      // Получаем информацию о покупках пользователя для этого курса
      const userPurchases = await this.purchaseService.findAll(userId);

      // Проверяем, есть ли у пользователя доступ к этому курсу
      return userPurchases.some(purchase => purchase.courseId === course.id);
    } catch (error) {
      console.error("Error checking lesson access:", error);
      return false; // Лучше вернуть false в случае ошибки, чтобы не предоставлять доступ по умолчанию
    }
  }
}
