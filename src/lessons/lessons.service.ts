import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
  ) {
  }

  private async syncCourseWithLesson(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(createLessonDto: CreateLessonDto) {
    const syncCourse = await this.syncCourseWithLesson(createLessonDto.courseId);
    if (!syncCourse) {
      throw new ConflictException('Такого курса не существует', 'courseId');
    }
    return this.prisma.lessons.create({
      data: createLessonDto
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

  async findListCourse(id: string) {
    const allLessons = await this.prisma.lessons.findMany({
      where: {
        courseId: id
      }
    })
    const headLessons = []
    const lessons = []

    allLessons.forEach((lesson) => {
      if (Number.isInteger(parseFloat(lesson.part))) {
        headLessons.push({
          id: lesson.id,
          name: lesson.name,
          part: lesson.part,
          courseId: lesson.courseId,
        });
      } else {
        lessons.push({
          id: lesson.id,
          name: lesson.name,
          part: lesson.part,
          duration: lesson.duration,
          courseId: lesson.courseId,
        });
      }
    })

    return { headLessons, lessons };
  }
}
