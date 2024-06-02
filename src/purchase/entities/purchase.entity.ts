import { ApiProperty } from '@nestjs/swagger';

export class Purchase {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор покупки' })
  id: string;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя, совершившего покупку' })
  userId: string;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор курса, который был куплен' })
  courseId: string;

  @ApiProperty({ example: '2024-04-15T12:00:00Z', description: 'Дата и время совершения покупки' })
  createdAt: Date;
}
export class CheckPurchase {
  @ApiProperty({ example: 'true', description: 'Курс уже приобретён' })
  purchased: boolean;
}