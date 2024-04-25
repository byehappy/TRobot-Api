import { Module } from '@nestjs/common';
import { CourseMaterialService } from './course-material.service';
import { CourseMaterialController } from './course-material.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CourseMaterialController],
  providers: [CourseMaterialService,PrismaService],
})
export class CourseMaterialModule {}
