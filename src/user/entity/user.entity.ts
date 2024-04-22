import { ApiProperty } from '@nestjs/swagger';
import { Course, Profile, Purchase } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  passwordHash: string;
  @ApiProperty()
  profile?: Profile;
  @ApiProperty()
  purchase:Purchase[];
  @ApiProperty()
  ownCourses:Course[];
}