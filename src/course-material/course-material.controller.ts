import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseMaterialService } from './course-material.service';
import { CreateCourseMaterialDto } from './dto/create-course-material.dto';
import { UpdateCourseMaterialDto } from './dto/update-course-material.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CourseMaterial } from './entities/course-material.entity';

@ApiTags('course-material') // Определяем тег для контроллера
@Controller('course-material')
export class CourseMaterialController {
  constructor(private readonly courseMaterialService: CourseMaterialService) {}

  @ApiOperation({ summary: 'Создать материал курса' })
  @ApiBody({ type: CreateCourseMaterialDto }) // Описываем тело запроса
  @ApiResponse({ status: 201, description: 'Материал курса успешно создан', type: CourseMaterial })
  @Post()
  async create(@Body() createCourseMaterialDto: CreateCourseMaterialDto): Promise<CourseMaterial> {
    return this.courseMaterialService.create(createCourseMaterialDto);
  }

  @ApiOperation({ summary: 'Получить все материалы курса' })
  @ApiResponse({ status: 200, description: 'Список материалов курса', type: [CourseMaterial] })
  @Get()
  async findAll(): Promise<CourseMaterial[]> {
    return this.courseMaterialService.findAll();
  }

  @ApiOperation({ summary: 'Получить материал курса по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор материала курса' })
  @ApiResponse({ status: 200, description: 'Материал курса', type: CourseMaterial })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseMaterialService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить материал курса' })
  @ApiParam({ name: 'id', description: 'Идентификатор материала курса' })
  @ApiBody({ type: UpdateCourseMaterialDto }) // Описываем тело запроса
  @ApiResponse({ status: 200, description: 'Материал курса успешно обновлен', type: CourseMaterial })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseMaterialDto: UpdateCourseMaterialDto): Promise<CourseMaterial> {
    return this.courseMaterialService.update(id, updateCourseMaterialDto);
  }

  @ApiOperation({ summary: 'Удалить материал курса' })
  @ApiParam({ name: 'id', description: 'Идентификатор материала курса' })
  @ApiResponse({ status: 200, description: 'Материал курса успешно удален' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseMaterialService.remove(id);
  }
}
