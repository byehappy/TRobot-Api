import { Module } from '@nestjs/common';
import { CourseMaterialService } from './course-material.service';
import { CourseMaterialController } from './course-material.controller';

@Module({
  controllers: [CourseMaterialController],
  providers: [CourseMaterialService],
})
export class CourseMaterialModule {}
