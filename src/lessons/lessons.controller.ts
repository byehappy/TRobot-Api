import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Lesson, LessonListEntity } from './entities/lesson.entity';
import { AccessTokenGuard } from '../common/guard/accessToken.guard';
import { TeacherGuard } from '../common/guard/teacher.guard';

@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({ summary: 'Создать новый урок - teacher' })
  @ApiCreatedResponse({ description: 'Урок успешно создан.',type:Lesson })
  @ApiBadRequestResponse({ description: 'Неверный запрос.' })
  @ApiBearerAuth()
  @UseGuards(TeacherGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOperation({ summary: 'Получить все уроки' })
  @ApiOkResponse({ description: 'Все уроки успешно получены.',type:[Lesson] })
  @ApiParam({ name: 'id', description: 'ID курса', type: 'string' })
  @Get("/course/:id")
  findAll(@Param('id') id: string) {
    return this.lessonsService.findAll(id);
  }

  @ApiOperation({ summary: 'Получить урок по ID' })
  @ApiOkResponse({ description: 'Урок успешно получен.',type:Lesson })
  @ApiNotFoundResponse({ description: 'Урок не найден.' })
  @ApiParam({ name: 'id', description: 'ID урока', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить урок по ID  - teacher' })
  @ApiOkResponse({ description: 'Урок успешно обновлен.',type:Lesson })
  @ApiNotFoundResponse({ description: 'Урок не найден.' })
  @ApiBadRequestResponse({ description: 'Неверный запрос.' })
  @ApiParam({ name: 'id', description: 'ID урока', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @ApiOperation({ summary: 'Удалить урок по ID - teacher' })
  @ApiNoContentResponse({ description: 'Урок успешно удален.' })
  @ApiNotFoundResponse({ description: 'Урок не найден.' })
  @ApiParam({ name: 'id', description: 'ID урока', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }

  @ApiOperation({ summary: 'Вывести заголовки и уроки курса - accessToken' })
  @ApiNoContentResponse({ description: 'Все заголовки и уроки курса получены.', type:LessonListEntity })
  @ApiNotFoundResponse({ description: 'Заголовки и уроки курса не найдены.' })
  @ApiParam({ name: 'id', description: 'ID курса', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('/lesson-list/:id')
  findListCourse(@Param('id') id: string) {
    return this.lessonsService.findListCourse(id);
  }
}
