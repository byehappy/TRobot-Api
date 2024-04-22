import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Web Development', description: 'Название категории' })
  @IsNotEmpty()
  @IsString()
  nameCategory: string;
}
