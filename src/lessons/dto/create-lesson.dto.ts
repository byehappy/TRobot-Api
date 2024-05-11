import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  part: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  content: string | null;

  @IsArray()
  @ApiProperty()
  contentVideo: string[] | null;

  @IsString()
  @ApiProperty()
  duration!: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
}
