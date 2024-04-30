import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
  ) {
  }
  create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data:createProfileDto
    });
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: string) {
    return this.prisma.profile.findFirst({
      where:{
        userId:id
      }
    });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where:{
        userId:id
      },
      data:{
        ...updateProfileDto
      }
    });
  }

  remove(id: string) {
    return this.prisma.profile.delete({
      where:{
        userId:id
      }
    });
  }
}
