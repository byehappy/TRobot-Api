import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherApplicationDto {
  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  readonly info: string;

  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  readonly userId: string;
}
