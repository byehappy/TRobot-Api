import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  create(createLessonDto: CreateLessonDto) {
    return this.prisma.lessons.create({
      data:createLessonDto
    });
  }

  findAll(id: string) {
    return this.prisma.lessons.findMany({
      where:{
        courseId:id
      }
    });
  }

  findOne(id: string) {
    return this.prisma.lessons.findFirst({
      where:{
        id:id
      }
    });
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lessons.update({
      where:{
        id:id
      },
      data:updateLessonDto
    });
  }

  remove(id: string) {
    return this.prisma.lessons.delete({
      where:{
        id:id
      }
    });
  }
}
