import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { UserModule } from './user/user.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CoursesModule, UserModule, LessonsModule, ProfileModule, CategoryModule],
})
export class AppModule {}
