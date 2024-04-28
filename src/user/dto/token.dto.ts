import {IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CheckTokenDto {
  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  readonly accessToken:string

  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class TokenDto {
  @ApiProperty()
  @IsString({ message: 'Значение должно быть строкой' })
  @IsNotEmpty()
  readonly token:string
}

