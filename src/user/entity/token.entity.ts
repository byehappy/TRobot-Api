import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class Tokens {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'The access token' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'The refresh token' })
  refreshToken: string;
}

export class RefreshResponse {
  @ApiProperty({ type: Tokens, description: 'Токены пользователя' })
  tokens: Tokens;

  @ApiProperty({ type: UserEntity, description: 'Информация о пользователе из БД' })
  user: UserEntity;
}