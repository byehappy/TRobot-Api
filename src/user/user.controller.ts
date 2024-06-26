import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards, HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse, ApiBearerAuth,
} from '@nestjs/swagger';
import { RefreshResponse, Tokens } from './entity/token.entity';
import { SignInUserDto } from './dto/signIn-user.dto';
import { UserEntity } from './entity/user.entity';
import { CheckTokenDto, TokenDto } from './dto/token.dto';
import { RefreshTokenGuard } from '../common/guard/refreshToken.guard';
import { AccessTokenGuard } from '../common/guard/accessToken.guard';
import { AdminGuard } from '../common/guard/admin.guard';
import { ChangeUserRoleDto } from './dto/change-role.dto';
import AccessRefreshTokens = Auth.AccessRefreshTokens;

@ApiTags('users')
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
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({ type: Tokens })
  @ApiBadRequestResponse({ description: 'Ошибка при авторизации пользователя' })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() signInDto: SignInUserDto):Promise<AccessRefreshTokens> {
    try {
      const tokens = await this.userService.login(signInDto.login, signInDto.passwordHash);
      return {
        accessToken:tokens.accessToken,
        refreshToken:tokens.refreshToken
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Вывод всех пользователей из БД - доступ через accessToken admin' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Найти пользователя по его Id - доступ через accessToken admin' })
  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @ApiOperation({ summary: 'Обновить данные пользователя - доступ через accessToken' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
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

  @ApiOperation({ summary: 'Удалить пользователя по его Id - доступ через accessToken admin' })
  @ApiOkResponse({ description: 'Пользователь успешно удален' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @UseGuards(AdminGuard)
  @ApiSecurity('accessToken')
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

  @ApiOperation({ summary: 'Проверка токенов (refresh/access) - доступ через refreshToken' })
  @ApiOkResponse({ type: RefreshResponse })
  @ApiBadRequestResponse({ description: 'Неверные токены' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @ApiSecurity('refreshToken')
  @Post('/refresh')
  async refreshTokens(@Body() tokens: CheckTokenDto) {
    try {
      const refreshedTokens = await this.userService.refreshTokens(tokens);
      return refreshedTokens;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Ошибка при обновлении токенов', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Расшифровка токена' })
  @ApiOkResponse({ description: 'Расшифрованный токен' })
  @Post('/decode-token')
  async decodeToken(@Body() token:TokenDto) {
    try {
      const decodedToken = this.userService.decodeToken(token.token);
      return decodedToken;
    } catch (error) {
      throw new HttpException('Ошибка при расшифровке токена', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Изменить роль пользователя' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiBadRequestResponse({ description: 'Ошибка при изменении роли пользователя' })
  @Patch(':id/change-role')
  async changeUserRole(@Param('id') id: string, @Body() changeUserRoleDto: ChangeUserRoleDto): Promise<User> {
    try {
      // Получаем информацию о пользователе
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
      }

      // Изменяем роль пользователя
      const updatedUser = await this.userService.changeUserRole(user, changeUserRoleDto.role);

      return updatedUser;
    } catch (error) {
      throw new HttpException('Ошибка при изменении роли пользователя', HttpStatus.BAD_REQUEST);
    }
  }
}
