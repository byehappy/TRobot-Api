import { ApiProperty } from '@nestjs/swagger';

export class Lesson {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор урока' })
  id: string;

  @ApiProperty({ example: 'Введение в программирование', description: 'Название урока' })
  name: string;

  @ApiProperty({ example: '1.1', description: 'Номер раздела' })
  part: string;

  @ApiProperty({ example: 'HTML Basics', description: 'Содержание урока (текст, ссылки и т. д.)' })
  content: string;

  @ApiProperty({ example: ['https://video.com/lesson1', 'https://video.com/lesson2'], description: 'Содержание урока (видео если есть)' })
  contentVideo: string[];

  @ApiProperty({ example: '30 минут', description: 'Продолжительность урока' })
  duration: string;

  @ApiProperty({ example: '1234567890', description: 'ID курса, к которому относится урок' })
  courseId: string;
}

class LessonHead {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор урока' })
  id: string;

  @ApiProperty({ example: 'Введение в программирование', description: 'Название урока' })
  name: string;

  @ApiProperty({ example: '1.1', description: 'Номер раздела' })
  part: string;

  @ApiProperty({ example: '1234567890', description: 'ID курса, к которому относится урок' })
  courseId: string;
}

export class LessonListEntity {
  @ApiProperty({type:LessonHead})
  headLessons:[LessonHead]

  @ApiProperty({type:Lesson})
  lessons:[Lesson]
}