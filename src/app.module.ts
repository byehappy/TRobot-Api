import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { UserModule } from './user/user.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CourseMaterialModule } from './course-material/course-material.module';
import { TeacherApplicationModule } from './teacher-application/teacher-application.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { PrismaModule } from './prisma/prisma.module';
import { AppLoggerMiddleware } from './logger';
import HealthModule from './health/health.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('MyApp', {
            colors: true,
            prettyPrint: true,
            processId: true
          }),
        ),
      }),
      new winston.transports.File({ filename: 'combined.log' })
    ],
  }),JwtModule.register({
    secret: process.env.SecretJWT, global: true,
  }), PrismaModule, CoursesModule, UserModule, LessonsModule, ProfileModule, CategoryModule, PurchaseModule, CourseMaterialModule, TeacherApplicationModule, HealthModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
