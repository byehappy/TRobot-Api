import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CourseEntity } from './entities/course.entity';
import { TeacherGuard } from '../common/guard/teacher.guard';

@Controller('courses')
@ApiTags("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Создание курса - teacher' })
  @ApiOkResponse({ type: CourseEntity})
  @ApiBadRequestResponse({ description: 'Ошибка при создании курса' })
  @ApiBearerAuth()
  @UseGuards(TeacherGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Вывод всех курсов из БД' })
  @ApiOkResponse({ type: [CourseEntity] })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiOperation({ summary: 'Найти курс по его Id' })
  @ApiOkResponse({ type: CourseEntity })
  @ApiNotFoundResponse({ description: 'Курс не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить данные курса - teacher' })
  @ApiOkResponse({ type: CourseEntity })
  @ApiNotFoundResponse({ description: 'Курс не найден' })
  @ApiBearerAuth()
  @UseGuards(TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Удалить курс по его Id - teacher' })
  @ApiOkResponse({ description: 'Курс успешно удален' })
  @ApiNotFoundResponse({ description: 'Курс не найден' })
  @ApiBearerAuth()
  @UseGuards(TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
