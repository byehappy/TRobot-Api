import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Создать категорию' })
  @ApiCreatedResponse({ description: 'Категория успешно создана',type:CategoryEntity })
  @ApiBadRequestResponse({ description: 'Ошибка при создании категории' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все категории' })
  @ApiOkResponse({ description: 'Все категории успешно получены',type:[CategoryEntity] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по идентификатору' })
  @ApiOkResponse({ description: 'Категория успешно найдена',type:CategoryEntity })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить категорию' })
  @ApiOkResponse({ description: 'Категория успешно обновлена',type:CategoryEntity })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  @ApiBadRequestResponse({ description: 'Ошибка при обновлении категории' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiOkResponse({ description: 'Категория успешно удалена' })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
