import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entity/user.entity';
import { CourseEntity } from './entities/course.entity';

@Controller('courses')
@ApiTags("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Создание курса' })
  @ApiOkResponse({ type: CourseEntity})
  @ApiBadRequestResponse({ description: 'Ошибка при создании курса' })
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
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'Курс не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить данные курса' })
  @ApiOkResponse({ type: CourseEntity })
  @ApiNotFoundResponse({ description: 'Курс не найден' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Удалить курс по его Id' })
  @ApiOkResponse({ description: 'Курс успешно удален' })
  @ApiNotFoundResponse({ description: 'Курс не найден' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
