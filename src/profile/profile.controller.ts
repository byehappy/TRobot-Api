import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileEntity, UpdateProfileEntity } from './entities/profile.entity';
import { AdminGuard } from '../common/guard/admin.guard';
import { AccessTokenGuard } from '../common/guard/accessToken.guard';


@Controller('profile')
@ApiTags("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Создать профиль - accessToken' })
  @ApiOkResponse({ description: 'Профиль успешно создан' })
  @ApiBadRequestResponse({ description: 'Ошибка при создании профиля' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'Получить все профили - admin' })
  @ApiOkResponse({ description: 'Список профилей', type: [ProfileEntity] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: 'Получить профиль по ID пользователя - accessToken' })
  @ApiOkResponse({ description: 'Найденный профиль', type: ProfileEntity })
  @ApiNotFoundResponse({ description: 'Профиль не найден' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить профиль - accessToken' })
  @ApiOkResponse({ description: 'Профиль успешно обновлен', type: UpdateProfileEntity })
  @ApiNotFoundResponse({ description: 'Профиль не найден' })
  @ApiBadRequestResponse({ description: 'Ошибка при обновлении профиля' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: 'Удалить профиль - accessToken' })
  @ApiOkResponse({ description: 'Профиль успешно удален' })
  @ApiNotFoundResponse({ description: 'Профиль не найден' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
