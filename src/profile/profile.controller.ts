import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileEntity, UpdateProfileEntity } from './entities/profile.entity';


@Controller('profile')
@ApiTags("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Создать профиль' })
  @ApiOkResponse({ description: 'Профиль успешно создан' })
  @ApiBadRequestResponse({ description: 'Ошибка при создании профиля' })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'Получить все профили' })
  @ApiOkResponse({ description: 'Список профилей', type: [ProfileEntity] })
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: 'Получить профиль по ID пользователя' })
  @ApiOkResponse({ description: 'Найденный профиль', type: ProfileEntity })
  @ApiNotFoundResponse({ description: 'Профиль не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить профиль' })
  @ApiOkResponse({ description: 'Профиль успешно обновлен', type: UpdateProfileEntity })
  @ApiNotFoundResponse({ description: 'Профиль не найден' })
  @ApiBadRequestResponse({ description: 'Ошибка при обновлении профиля' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: 'Удалить профиль' })
  @ApiOkResponse({ description: 'Профиль успешно удален' })
  @ApiNotFoundResponse({ description: 'Профиль не найден' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
