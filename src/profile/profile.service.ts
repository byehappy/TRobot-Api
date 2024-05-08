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

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const userdata = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        email: updateProfileDto.email
      }
    })
    const profileUpdate = await this.prisma.profile.update({
      where: {
        userId: id
      },
      data: {
        bio: updateProfileDto.bio,
        phone: updateProfileDto.phone,
      }
    });
    return {...profileUpdate,email:userdata.email}
  }

  remove(id: string) {
    return this.prisma.profile.delete({
      where:{
        userId:id
      }
    });
  }
}
