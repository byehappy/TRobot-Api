import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PurchaseService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  create(createPurchaseDto: CreatePurchaseDto) {
    return this.prisma.purchase.create({
      data:createPurchaseDto
    });
  }

  findAll() {
    return this.prisma.purchase.findMany();
  }

  findOne(id: string) {
    return this.prisma.purchase.findFirst({
      where:{
        id:id
      }
    });
  }

  update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return this.prisma.purchase.update({
      where:{
        id:id
      },
      data:updatePurchaseDto
    });
  }

  remove(id: string) {
    return this.prisma.purchase.delete({
      where:{
        id:id
      }
    });
  }
}