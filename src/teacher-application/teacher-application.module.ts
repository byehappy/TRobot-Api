import { Module } from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { TeacherApplicationController } from './teacher-application.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TeacherApplicationController],
  providers: [TeacherApplicationService,PrismaService],
})
export class TeacherApplicationModule {}
