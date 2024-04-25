import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Purchase } from './entities/purchase.entity';

@ApiTags('purchase') // Определяем тег для контроллера
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @ApiOperation({ summary: 'Создать запись о покупке' })
  @ApiBody({ type: CreatePurchaseDto }) // Описываем тело запроса
  @ApiResponse({ status: 201, description: 'Запись о покупке успешно создана', type: Purchase })
  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.create(createPurchaseDto);
  }

  @ApiOperation({ summary: 'Получить все записи о покупках' })
  @ApiResponse({ status: 200, description: 'Список записей о покупках', type: [Purchase] })
  @Get()
  async findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @ApiOperation({ summary: 'Получить запись о покупке по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор записи о покупке' })
  @ApiResponse({ status: 200, description: 'Запись о покупке', type: Purchase })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Purchase> {
    return this.purchaseService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить запись о покупке' })
  @ApiParam({ name: 'id', description: 'Идентификатор записи о покупке' })
  @ApiBody({ type: UpdatePurchaseDto }) // Описываем тело запроса
  @ApiResponse({ status: 200, description: 'Запись о покупке успешно обновлена', type: Purchase })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @ApiOperation({ summary: 'Удалить запись о покупке' })
  @ApiParam({ name: 'id', description: 'Идентификатор записи о покупке' })
  @ApiResponse({ status: 200, description: 'Запись о покупке успешно удалена' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}
