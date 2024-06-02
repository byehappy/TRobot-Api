import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signIn-user.dto';
import * as request from 'supertest';
import { INestApplication, HttpStatus, HttpException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AdminGuard } from '../common/guard/admin.guard';
import { AccessTokenGuard } from '../common/guard/accessToken.guard';

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;

  const mockUserService = {
    registration: jest.fn(),
    login: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    deleteUser: jest.fn(),
    refreshTokens: jest.fn(),
    decodeToken: jest.fn(),
    changeUserRole: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'testSecret' })],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        PrismaService,
        JwtService,
        {
          provide: AdminGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
        {
          provide: AccessTokenGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userService = moduleRef.get<UserService>(UserService);
  });
  it('app - should be defined', () => {
    expect(app).toBeDefined();
  });

  it('userService - should be defined', () => {
    expect(userService).toBeDefined();
  });


  it('/POST user/registration - successful', async () => {
    const createUserDto: CreateUserDto = {
      login: 'TestName',
      email: 'TestEmail@gmail.com',
      role: 'USER',
      passwordHash: 'TestPassword1234',
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
    mockUserService.registration.mockResolvedValue({
      ...createUserDto,
      passwordHash: 'hashedPassword',
    } as User); // Explicitly cast to User

    return request(app.getHttpServer())
      .post('/user/registration')
      .send(createUserDto)
      .expect(HttpStatus.CREATED)
      .then((response) => {
        expect(response.body).toEqual({
          ...createUserDto,
          passwordHash: 'hashedPassword',
        });
      });
  });

  it('/POST user/registration with existing email', async () => {
    const createUserDto: CreateUserDto = {
      login: 'TestName',
      email: 'TestEmail@gmail.com',
      role: 'USER',
      passwordHash: 'TestPassword1234',
    };

    mockUserService.registration.mockRejectedValue(
      new HttpException('Email уже занята', HttpStatus.BAD_REQUEST),
    );

    return request(app.getHttpServer())
      .post('/user/registration')
      .send(createUserDto)
      .expect(HttpStatus.CONFLICT)
  });

  it('/POST user/login - successful', async () => {
    const signInUserDto: SignInUserDto = {
      login: 'test1',
      passwordHash: 'qwerty',
    };

    const tokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    mockUserService.login.mockResolvedValue(tokens);

    return request(app.getHttpServer())
      .post('/user/login')
      .send(signInUserDto)
      .expect(HttpStatus.OK)
      .then((response) => {
        expect(response.body).toEqual(tokens);
      });
  });


  afterAll(async () => {
    await app.close();
  });
});
