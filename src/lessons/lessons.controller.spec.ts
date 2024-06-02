import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from './lessons.controller';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestToken, mockRegularUser, mockAdminUser, mockTeacherUser } from '../../test/test-utils/user.mock';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { ObjectId } from 'mongodb';

describe('LessonsController', () => {
  let controller: LessonsController;
  let app: INestApplication;
  let prisma: PrismaService;
  const createdLessonIds: string[] = []; // Массив для хранения идентификаторов созданных уроков
  const createLessonDto: CreateLessonDto = {
    name: 'New Lesson',
    part: '1.1',
    content: 'Lesson content',
    contentVideo: ['https://video.com/lesson1'],
    duration: '30 minutes',
    courseId: '663b80c300060aa3e26ce27c',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
    app = module.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('/POST /lessons should create a lesson (valid) with admin access', async () => {
      const token = createTestToken(mockAdminUser);
      const createLessonDto: CreateLessonDto = {
        name: 'New Lesson',
        part: '1.1',
        content: 'Lesson content',
        contentVideo: ['https://video.com/lesson1'],
        duration: '30 minutes',
        courseId: '663b80c300060aa3e26ce27c',
      };

      const response = await request(app.getHttpServer())
        .post('/lessons')
        .auth(token, { type: 'bearer' })
        .send(createLessonDto)
        .expect(201);

      createdLessonIds.push(response.body.id); // Сохраните идентификатор созданного курса
      expect(response.body).toEqual(expect.objectContaining(createLessonDto));
    });
    it('/POST /lessons should create a lesson valid with teacher access', async () => {
      const token = createTestToken(mockTeacherUser);

      const response = await request(app.getHttpServer())
        .post('/lessons')
        .auth(token, { type: 'bearer' })
        .send(createLessonDto)
        .expect(201);

      createdLessonIds.push(response.body.id); // Сохраните идентификатор созданного курса
      expect(response.body).toEqual(expect.objectContaining(createLessonDto));
    });

    it('/POST /lessons should not create a lesson (invalid courseId)', async () => {
      const token = createTestToken(mockAdminUser);
      const createLessonDto: CreateLessonDto = {
        name: 'New Lesson',
        part: '1.1',
        content: 'Lesson content',
        contentVideo: ['https://video.com/lesson1'],
        duration: '30 minutes',
        courseId: new ObjectId().toHexString(),
      };

      await request(app.getHttpServer())
        .post('/lessons')
        .auth(token, { type: 'bearer' })
        .send(createLessonDto)
        .expect(409);
    });
  });
  describe('/GET /lessons/:id findOne', () => {
    it('should find a lesson with access', async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJpYmVyIiwiZW1haWwiOiJiaWJlckBleGFtcGxlLmNvbSIsImlhdCI6MTcxNDI5ODg5NywiZXhwIjoxNzE2ODkwODk3fQ.aKf7v1qhMy9BNiJC_MBzBsdwNrBmHX8s-XsSDeArAYc";
      const lessonId = '6630bbe5adc8fefb76b06aeb';
      const lesson = {
        id: lessonId,
        name: 'Основы React JS',
        part: '1.1',
        duration: '25',
        courseId: '662b5eef032696382d9674e6',
      };

      const response = await request(app.getHttpServer())
        .get(`/lessons/${lessonId}`)
        .auth(token, { type: 'bearer' })
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining(lesson),
      );
    });

    it('/GET /lessons/:id should throw an UnauthorizedException if no access', async () => {
      const token = createTestToken(mockRegularUser);
      const lessonId = "6630bbe5adc8fefb76b06aeb";

      await request(app.getHttpServer())
        .get(`/lessons/${lessonId}`)
        .auth(token, { type: 'bearer' })
        .expect(403);
    });
  });

  async function cleanupDatabase() {
    await prisma.lessons.deleteMany({
      where: {
        id: {
          in: createdLessonIds,
        },
      },
    });
  }
});
