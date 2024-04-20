import { IsAlphanumeric, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class SignInUserDto {
  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  readonly login:string

  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  @Length(6, 30, { message: 'Не менее 6 и не более 30 символов' })
  passwordHash: string;
}


