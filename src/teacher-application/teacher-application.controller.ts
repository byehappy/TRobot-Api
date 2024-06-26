import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateTeacherApplicationDto } from './dto/update-teacher-application.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth, ApiParam,
} from '@nestjs/swagger';
import { TeacherApplication } from './entities/teacher-application.entity';
import { AdminGuard } from '../common/guard/admin.guard';
import { AccessTokenGuard } from '../common/guard/accessToken.guard';

@ApiTags('teacher-application')
@Controller('teacher-application')
export class TeacherApplicationController {
  constructor(private readonly teacherApplicationService: TeacherApplicationService) {}

  @ApiOperation({ summary: 'Создать новую заявку на преподавателя - accessToken' })
  @ApiResponse({ status: 201, description: 'Заявка на преподавателя успешно создана', type: TeacherApplication })
  @ApiBadRequestResponse({ description: 'Некорректные входные данные' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createTeacherApplicationDto: CreateTeacherApplicationDto) {
    return this.teacherApplicationService.create(createTeacherApplicationDto);
  }

  @ApiOperation({ summary: 'Получить все заявки на преподавателя - admin' })
  @ApiResponse({ status: 200, description: 'Вернуть все заявки на преподавателя', type: [TeacherApplication] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.teacherApplicationService.findAll();
  }

  @ApiOperation({ summary: 'Получить заявку на преподавателя по идентификатору - accessToken' })
  @ApiResponse({ status: 200, description: 'Вернуть заявку на преподавателя', type: TeacherApplication })
  @ApiNotFoundResponse({ description: 'Заявка на преподавателя не найдена' })
  @ApiParam({ name: 'id', description: 'Идентификатор пользователя' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherApplicationService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить заявку на преподавателя' })
  @ApiResponse({ status: 200, description: 'Заявка на преподавателя успешно обновлена', type: TeacherApplication })
  @ApiNotFoundResponse({ description: 'Заявка на преподавателя не найдена' })
  @ApiBadRequestResponse({ description: 'Некорректные входные данные' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherApplicationDto: UpdateTeacherApplicationDto) {
    return this.teacherApplicationService.update(id, updateTeacherApplicationDto);
  }

  @ApiOperation({ summary: 'Удалить заявку на преподавателя' })
  @ApiResponse({ status: 200, description: 'Заявка на преподавателя успешно удалена', type: TeacherApplication })
  @ApiNotFoundResponse({ description: 'Заявка на преподавателя не найдена' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherApplicationService.remove(id);
  }
  @ApiOperation({ summary: 'Принять заявку на преподавателя - admin' })
  @ApiResponse({ status: 200, description: 'Заявка успешно принята', type: TeacherApplication })
  @ApiNotFoundResponse({ description: 'Заявка на преподавателя не найдена' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get('/apply/:id')
  apply(@Param('id') id: string) {
    return this.teacherApplicationService.apply(id);
  }
  @ApiOperation({ summary: 'Отклонить заявку на преподавателя - admin' })
  @ApiResponse({ status: 200, description: 'Заявка успешно отклонена', type: TeacherApplication })
  @ApiNotFoundResponse({ description: 'Заявка на преподавателя не найдена' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get('/decline/:id')
  reject(@Param('id') id: string) {
    return this.teacherApplicationService.reject(id);
  }
}
