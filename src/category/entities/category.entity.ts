import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор категории' })
  id: string;

  @ApiProperty({ example: 'JavaScript', description: 'Название категории' })
  nameCategory: string;
}
