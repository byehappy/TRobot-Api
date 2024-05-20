import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaService } from '../prisma.service';
import { PurchaseModule } from '../purchase/purchase.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [PurchaseModule,CoursesModule],
  controllers: [LessonsController],
  providers: [LessonsService,PrismaService],
})
export class LessonsModule {}
