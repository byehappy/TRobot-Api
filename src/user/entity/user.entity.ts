import {  ApiProperty } from '@nestjs/swagger';
import { Course, Profile, Purchase, Role } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UserEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор пользователя' })
  id: string;

  @ApiProperty({ example: 'USER', description: 'Роль пользователя' })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: 'john_doe', description: 'Логин пользователя' })
  login: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
  email: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Refresh token' })
  refreshToken: string;

  @ApiProperty({ example: '$2b$10$DFfWNUt3c/izNlpHSjnkwO91uhTAPjhN6/YTbv2F9GbmTXPOxBYm6', description: 'Хэш пароля' })
  passwordHash: string;

  @ApiProperty({ description: 'Профиль пользователя' })
  profile?: Profile;

  @ApiProperty({ description: 'Список покупок пользователя' })
  purchase: Purchase[];

  @ApiProperty({ description: 'Список собственных курсов пользователя' })
  ownCourses: Course[];
}
