import { Module } from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { TeacherApplicationController } from './teacher-application.controller';
import { PrismaService } from '../prisma.service';
import { AccessTokenStrategy } from '../common/strategy/accessToken.strategy';

@Module({
  controllers: [TeacherApplicationController],
  providers: [TeacherApplicationService,PrismaService,AccessTokenStrategy],
})
export class TeacherApplicationModule {}
