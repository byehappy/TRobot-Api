import { Module } from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { TeacherApplicationController } from './teacher-application.controller';
import { AccessTokenStrategy } from '../common/strategy/accessToken.strategy';

@Module({
  controllers: [TeacherApplicationController],
  providers: [TeacherApplicationService,AccessTokenStrategy],
})
export class TeacherApplicationModule {}
