import { Injectable } from '@nestjs/common';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateTeacherApplicationDto } from './dto/update-teacher-application.dto';
import { PrismaService } from '../prisma.service';
import { Role, Status } from '@prisma/client';

@Injectable()
export class TeacherApplicationService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  async create(createTeacherApplicationDto: CreateTeacherApplicationDto) {
    await this.prisma.teacherApplication.deleteMany({
      where: {
        userId: createTeacherApplicationDto.userId
      }
    });
    return this.prisma.teacherApplication.create({ data: createTeacherApplicationDto });
  }

  findAll() {
    return this.prisma.teacherApplication.findMany();
  }

  findOne(id: string) {
    return this.prisma.teacherApplication.findFirst({
      where:{
        userId:id
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
  async changeRole(appId: string){
    const user = await this.prisma.teacherApplication.findFirst({
      where: {
        id: appId
      }
    });

    // Обновляем роль пользователя
    return await this.prisma.user.update({
      where: {
        id: user.userId
      },
      data: {
        role: Role.TEACHER
      }
    });
  }
  async apply(id: string) {
    await this.changeRole(id)
    return await this.prisma.teacherApplication.update({
      where: {
        id: id
      },
      data: {
        status: Status.APPROVED
      }
    }) ;
  }

  reject(id:string){
    return this.prisma.teacherApplication.update({
      where:{
        id:id
      },
      data:{
        status:Status.REJECTED
      }
    })
  }
}
