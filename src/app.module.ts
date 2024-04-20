import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoursesModule, UserModule],
})
export class AppModule {}
