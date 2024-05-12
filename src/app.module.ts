import { Module } from '@nestjs/common';
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

@Module({
  imports: [JwtModule.register({
    secret: process.env.SecretJWT,global:true
  }),CoursesModule, UserModule, LessonsModule, ProfileModule, CategoryModule, PurchaseModule, CourseMaterialModule, TeacherApplicationModule],
})
export class AppModule {}
