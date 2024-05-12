import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Purchase } from './entities/purchase.entity';
import { AdminGuard } from '../common/guard/admin.guard';
import { AccessTokenGuard } from '../common/guard/accessToken.guard';

@ApiTags('purchase') // Определяем тег для контроллера
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @ApiOperation({ summary: 'Создать запись о покупке - accessToken' })
  @ApiBody({ type: CreatePurchaseDto }) // Описываем тело запроса
  @ApiResponse({ status: 201, description: 'Запись о покупке успешно создана', type: Purchase })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.create(createPurchaseDto);
  }

  @ApiOperation({ summary: 'Получить все записи о покупках конкретного пользователя' })
  @ApiResponse({ status: 200, description: 'Список записей о покупках', type: [Purchase] })
  @Get("/user/:id")
  async findAll(@Param('id') id: string): Promise<Purchase[]> {
    return this.purchaseService.findAll(id);
  }

  @ApiOperation({ summary: 'Получить запись о покупке по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор записи о покупке' })
  @ApiResponse({ status: 200, description: 'Запись о покупке', type: Purchase })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Purchase> {
    return this.purchaseService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить запись о покупке - admin' })
  @ApiParam({ name: 'id', description: 'Идентификатор записи о покупке' })
  @ApiBody({ type: UpdatePurchaseDto }) // Описываем тело запроса
  @ApiResponse({ status: 200, description: 'Запись о покупке успешно обновлена', type: Purchase })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto){
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @ApiOperation({ summary: 'Удалить запись о покупке - admin' })
  @ApiParam({ name: 'id', description: 'Идентификатор записи о покупке' })
  @ApiResponse({ status: 200, description: 'Запись о покупке успешно удалена' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}
