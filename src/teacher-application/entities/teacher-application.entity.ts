import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';

export class TeacherApplication {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  info: string;

  @ApiProperty({ enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' })
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}