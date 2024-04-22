import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'Familiya Imya Otchestvo', description: 'ФИО' })
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty({ example: '+1234567890', description: 'Номер телефона' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
