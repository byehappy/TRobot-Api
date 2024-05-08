import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор профиля' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'ФИО' })
  bio: string;

  @ApiProperty({ example: '+1234567890', description: 'Номер телефона пользователя' })
  phone: string;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
  userId: string;
}

export class UpdateProfileEntity extends ProfileEntity {
  @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
  email: string;
}
