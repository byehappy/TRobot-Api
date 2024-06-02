import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';


@Controller('health')
class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      async  () => this.prismaHealth.pingCheck('prisma', this.prisma),
      //процесс не должен использовать более 300 МБ оперативной памяти
      async () => this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // Процессу должно быть выделено не более 300 МБ RSS-памяти
      async () => this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
    ]);
  }
}

export default HealthController;