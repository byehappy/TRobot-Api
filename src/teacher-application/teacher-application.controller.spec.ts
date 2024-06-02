import { Test, TestingModule } from '@nestjs/testing';
import { TeacherApplicationController } from './teacher-application.controller';
import { AppModule } from '../app.module';

describe('TeacherApplicationController', () => {
  let controller: TeacherApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<TeacherApplicationController>(TeacherApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
