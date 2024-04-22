import { Category, CourseMaterial, Lessons, Purchase, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CourseEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  author: User;
  @ApiProperty()
  duration?: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  categories: Category[];
  @ApiProperty()
  price: number;
  @ApiProperty()
  lessons: Lessons[];
  @ApiProperty()
  purchase: Purchase[];
  @ApiProperty()
  courseMaterial?: CourseMaterial;
}

