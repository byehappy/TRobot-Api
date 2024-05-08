import { ApiProperty } from '@nestjs/swagger';

export class TeacherApplication {
  @ApiProperty()
  id: string;

  @ApiProperty({example:"1a2sd3asd1a3"})
  userId: string;

  @ApiProperty()
  info: string;

  @ApiProperty({ enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' })
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}