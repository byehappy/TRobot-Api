import { ApiProperty } from '@nestjs/swagger';

export class CourseMaterial {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор материала курса' })
  id: string;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор курса, к которому относится материал' })
  courseId: string;

  @ApiProperty({ example: 'Web Development', description: 'Описание профессии, например, "Веб-разработчик"' })
  profession: string;

  @ApiProperty({ example: 'Дополнительная информация о курсе', description: 'Дополнительная информация о курсе' })
  about: string;

  @ApiProperty({ example: ['HTML', 'CSS', 'JavaScript'], description: 'Умения, которые студенты приобретут после завершения курса' })
  skillsLearned: string[];

  @ApiProperty({ example: ['Интерактивные задания', 'Контрольные вопросы'], description: 'Преимущества курса' })
  advantages: string[];

  @ApiProperty({ example: 'Содержание курса', description: 'Содержание курса' })
  curriculum: string;

  @ApiProperty({ example: ['Компьютер', 'Интернет-соединение'], description: 'Требования к участию в курсе' })
  requirements: string[];

  @ApiProperty({ example: ['Дополнительные материалы', 'Ссылки на ресурсы'], description: 'Дополнительные ресурсы или материалы' })
  resources: string[];

  @ApiProperty({ example: '2022-04-15T12:00:00Z', description: 'Дата создания материала курса' })
  createdAt: Date;

  @ApiProperty({ example: '2022-04-15T13:30:00Z', description: 'Дата последнего обновления материала курса' })
  updatedAt: Date;
}
