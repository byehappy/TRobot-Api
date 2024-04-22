import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService
  ) {
  }
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data:createCategoryDto
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: string) {
    return this.prisma.category.findFirst({
      where:{
        id:id
      }
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where:{
        id:id
      },
      data:updateCategoryDto
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where:{
        id:id
      }
    });
  }
}