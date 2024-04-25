import { Injectable } from '@nestjs/common';
import { CreateCourseMaterialDto } from './dto/create-course-material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course-material.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CourseMaterialService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  create(createCourseMaterialDto: CreateCourseMaterialDto) {
    return this.prisma.courseMaterial.create({
      data:createCourseMaterialDto
    });
  }

  findAll() {
    return this.prisma.courseMaterial.findMany();
  }

  findOne(id: string) {
    return this.prisma.courseMaterial.findFirst({
      where:{
        id:id
      }
    });
  }

  update(id: string, updateCourseMaterialDto: UpdateCourseMaterialDto) {
    return this.prisma.courseMaterial.update({
      where: {
        id: id
      },
      data: updateCourseMaterialDto
    });
  }

  remove(id: string) {
    return this.prisma.courseMaterial.delete({
      where:{
        id:id
      }
    });
  }
}
