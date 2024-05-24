import { Module } from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { TeacherApplicationController } from './teacher-application.controller';
import { AccessTokenStrategy } from '../common/strategy/accessToken.strategy';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TeacherApplicationController],
  providers: [TeacherApplicationService,AccessTokenStrategy,UserService],
})
export class TeacherApplicationModule {}
