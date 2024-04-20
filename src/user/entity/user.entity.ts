import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  passwordHash: string;
}