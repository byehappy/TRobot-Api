import { Injectable } from '@nestjs/common';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateTeacherApplicationDto } from './dto/update-teacher-application.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TeacherApplicationService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  create(createTeacherApplicationDto: CreateTeacherApplicationDto) {
    return this.prisma.teacherApplication.create({data:createTeacherApplicationDto});
  }

  findAll() {
    return this.prisma.teacherApplication.findMany();
  }

  findOne(id: string) {
    return this.prisma.teacherApplication.findFirst({
      where:{
        id:id
      }
    });
  }

  update(id: string, updateTeacherApplicationDto: UpdateTeacherApplicationDto) {
    return  this.prisma.teacherApplication.update({
      where:{
        id:id
      },
      data:updateTeacherApplicationDto
    });
  }

  remove(id: string) {
    return this.prisma.teacherApplication.delete({
      where:{
        id:id
      }
    });
  }
}
