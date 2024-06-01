import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CheckPurchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
  ) {
  }

  create(createPurchaseDto: CreatePurchaseDto) {
    return this.prisma.purchase.create({
      data: createPurchaseDto,
    });
  }

  findAll(id: string) {
    return this.prisma.purchase.findMany({
      where: {
        userId: id,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.purchase.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return this.prisma.purchase.update({
      where: {
        id: id,
      },
      data: updatePurchaseDto,
    });
  }

  remove(id: string) {
    return this.prisma.purchase.delete({
      where: {
        id: id,
      },
    });
  }

  async checkCourse(courseId: string, userId: string): Promise<CheckPurchase> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: { purchase: { where: { userId: userId } } },
    });
    return { purchased: course !== null && course.purchase.length > 0 };
  }
}
