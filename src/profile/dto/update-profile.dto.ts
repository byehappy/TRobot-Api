import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {

  @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
  email: string;
}
