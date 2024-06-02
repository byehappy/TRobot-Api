import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({ example: '123abc', description: 'Идентификатор пользователя' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: '456def', description: 'Идентификатор курса' })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
