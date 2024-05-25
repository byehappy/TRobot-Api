import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { createTestToken, mockTeacherUser, mockAdminUser, mockRegularUser } from '../../test/test-utils/user.mock';
import { PrismaService } from '../prisma/prisma.service';

describe('CoursesController', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const createdCourseIds: string[] = []; // Массив для хранения идентификаторов созданных курсов

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await app.close();
  });
  describe("valid dto create course",()=>{
    it('/POST /courses should create a course with admin token', async () => {
      const token = createTestToken(mockAdminUser);
      const createCourseDto = {
        title: 'Test Course',
        description: 'Test Description',
        tags: ['test', 'course'],
        authorId: mockAdminUser.id,
        price: 100,
        iconUrl: 'abc',
      };

      const response = await request(app.getHttpServer())
        .post('/courses')
        .auth(token, { type: 'bearer' })
        .send(createCourseDto)
        .expect(201);

      createdCourseIds.push(response.body.id); // Сохраните идентификатор созданного курса
      expect(response.body).toEqual(expect.objectContaining(createCourseDto));
    });

    it('/POST /courses should create a course with teacher token', async () => {
      const token = createTestToken(mockTeacherUser);

      const createCourseDto = {
        title: 'Test Course',
        description: 'Test Description',
        tags: ['test', 'course'],
        authorId: mockTeacherUser.id,
        price: 100,
        iconUrl: 'abc',
      };

      const response = await request(app.getHttpServer())
        .post('/courses')
        .auth(token, { type: 'bearer' })
        .send(createCourseDto)
        .expect(201);

      createdCourseIds.push(response.body.id); // Сохраните идентификатор созданного курса
      expect(response.body).toEqual(expect.objectContaining(createCourseDto));
    });
  it('/POST /courses should not create a course with regular user token', async () => {
    const token = createTestToken(mockRegularUser);

    const createCourseDto = {
      title: 'Test Course',
      description: 'Test Description',
      tags: ['test', 'course'],
      authorId: mockRegularUser.id,
      price: 100,
      iconUrl: 'abc',
    };

    await request(app.getHttpServer())
      .post('/courses')
      .auth(token, { type: 'bearer' })
      .send(createCourseDto)
      .expect(403);
  });
  })
  describe('get course by id', () => {
    it('/GET /courses/:id should retrieve course data by id', async () => {
      const courseId = '662b5eef032696382d9674e6';
      const token = createTestToken(mockRegularUser);

      const response = await request(app.getHttpServer())
        .get(`/courses/${courseId}`)
        .auth(token, { type: 'bearer' })
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: courseId,
          title: 'Основы веб-разработки',
          description: null,
          tags: ['Для школьников'],
          authorId: '662b5e41a130347a4b6fdfd1',
          price: 25,
          iconUrl: 'https://flomaster.top/uploads/posts/2023-01/1673390573_flomaster-club-p-chelovek-za-kompom-risunok-vkontakte-10.png',
          categoryIDs: expect.arrayContaining([
            '662b5c73b10abed2a380d184',
            '662b5c7cb10abed2a380d185',
            '662b5c84b10abed2a380d186',
          ]),
          duration: 30,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });
  });

  async function cleanupDatabase() {
    await prisma.course.deleteMany({
      where: {
        id: {
          in: createdCourseIds,
        },
      },
    });
  }
});
