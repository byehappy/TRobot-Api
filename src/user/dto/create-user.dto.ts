import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import {Role} from "@prisma/client"
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email:string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role:Role

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


