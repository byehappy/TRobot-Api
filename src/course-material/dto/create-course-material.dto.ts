import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseMaterialDto {
  @ApiProperty({ example: '456def', description: 'Идентификатор курса' })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({ example: 'Web Development', description: 'Описание профессии, например, "Веб-разработчик"' })
  @IsNotEmpty()
  @IsString()
  profession: string;

  @ApiProperty({ example: 'Additional information about the course', description: 'Дополнительная информация о курсе' })
  @IsOptional()
  @IsString()
  about: string;


  @ApiProperty({ example: ['HTML', 'CSS', 'JavaScript'], description: 'Умения, которые студенты приобретут после завершения курса' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skillsLearned: string[];

  @ApiProperty({ example: ['Flexible schedule', 'Lifetime access'], description: 'Преимущества курса' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  advantages: string[];


  @ApiProperty({ example: 'Curriculum details', description: 'Содержание курса' })
  @IsNotEmpty()
  @IsString()
  curriculum: string;

  @ApiProperty({ example: ['Basic programming knowledge', 'Access to a computer'], description: 'Требования к участию в курсе' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @ApiProperty({ example: ['Additional resources', 'Links to tutorials'], description: 'Дополнительные ресурсы или материалы' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources: string[];
}
