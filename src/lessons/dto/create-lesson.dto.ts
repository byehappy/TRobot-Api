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
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsArray()
  @ApiProperty()
  contentVideo: string[];

  @IsString()
  @ApiProperty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
}
