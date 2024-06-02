import { PartialType } from '@nestjs/swagger';
import { CreateTeacherApplicationDto } from './create-teacher-application.dto';

export class UpdateTeacherApplicationDto extends PartialType(CreateTeacherApplicationDto) {}
