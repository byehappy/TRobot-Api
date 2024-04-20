import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshTokenGuard } from '../guard/refreshToken.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Tokens } from './entity/token.entity';
import { SignInUserDto } from './dto/signIn-user.dto';
import { UserEntity } from './entity/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiOkResponse({ type: UserEntity})
  @ApiBadRequestResponse({ description: 'Ошибка при регистрации пользователя' })
  @Post('/registration')
  async registration(@Body() userData: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.registration(userData);
      return user;
    } catch (error) {
      throw new HttpException('Ошибка при регистрации пользователя', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({ type: Tokens })
  @ApiBadRequestResponse({ description: 'Ошибка при авторизации пользователя' })
  @Post('/login')
  async login(@Body() signInDto: SignInUserDto): Promise<Tokens> {
    try {
      const tokens = await this.userService.login(signInDto.login, signInDto.passwordHash);
      return tokens;
    } catch (error) {
      throw new HttpException('Ошибка при авторизации пользователя', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Вывод всех пользователей из БД' })
  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Найти пользователя по его Id' })
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      if (!updatedUser) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException('Ошибка при обновлении данных пользователя', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Удалить пользователя по его Id' })
  @ApiOkResponse({ description: 'Пользователь успешно удален' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.deleteUser({ id: id });
      return 'Пользователь успешно удален';
    } catch (error) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Проверка токенов (refresh/access)' })
  @ApiOkResponse({ type: Tokens })
  @ApiBadRequestResponse({ description: 'Неверные токены' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @UseGuards(RefreshTokenGuard)
  @ApiSecurity('Refresh-Token')
  @Post('/refresh/:id')
  async refreshTokens(@Body() tokens: { accessToken: string; refreshToken: string }, @Param('id') id: string) {
    try {
      const refreshedTokens = await this.userService.refreshTokens(tokens, id);
      return refreshedTokens;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Ошибка при обновлении токенов', HttpStatus.BAD_REQUEST);
    }
  }
}
