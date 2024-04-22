import { IsString, IsOptional, IsArray, IsInt, Min, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorId: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @ApiProperty()
  duration?: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  categoryIDs?: string[];

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
