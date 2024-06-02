import { Category, CourseMaterial, Lessons, Purchase, User } from '@prisma/client';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@ApiExtraModels(UserEntity,Lesson)
export class CourseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор курса' })
  id: string;

  @ApiProperty({ example: 'Web Development', description: 'Название курса' })
  title: string;

  @ApiProperty({ example: 'Learn web development from scratch', description: 'Описание курса' })
  description?: string;

  @ApiProperty({ example: ['web', 'development'], description: 'Теги курса' })
  tags: string[];

  @ApiProperty({ type: () => UserEntity, description: 'Автор курса' })
  author: User;

  @ApiProperty({ example: 60, description: 'Продолжительность курса в минутах' })
  duration?: number;

  @ApiProperty({ example: new Date(), description: 'Дата создания курса' })
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: 'Дата последнего обновления курса' })
  updatedAt: Date;

  @ApiProperty({ description: 'Категории курса' })
  categories: Category[];

  @ApiProperty({ example: 100, description: 'Цена курса в валюте' })
  price: number;

  @ApiProperty({ example: "", description: 'Ссылка на иконку курса' })
  iconUrl: string;

  @ApiProperty({ type: ()=> Lesson,description: 'Уроки курса' })
  lessons: Lessons[];

  @ApiProperty({description: 'Список покупок курса' })
  purchase: Purchase[];

  @ApiProperty({ description: 'Материалы курса' })
  courseMaterial?: CourseMaterial;
}
