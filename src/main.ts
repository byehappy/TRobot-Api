import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as basicAuth from "express-basic-auth";
import * as process from 'process';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.use('/docs*',basicAuth({
    challenge:true,
    users:{
     Admin :`${process.env.SWAGGER_PASSWORD}`
    }
  }))
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.enableCors({credentials:true,origin:true,allowedHeaders:'*'})
  const config = new DocumentBuilder()
    .setTitle('TRobot api')
    .setDescription('The TRobot API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
} 
bootstrap();
