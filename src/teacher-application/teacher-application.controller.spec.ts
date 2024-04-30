import { Test, TestingModule } from '@nestjs/testing';
import { TeacherApplicationController } from './teacher-application.controller';
import { TeacherApplicationService } from './teacher-application.service';

describe('TeacherApplicationController', () => {
  let controller: TeacherApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherApplicationController],
      providers: [TeacherApplicationService],
    }).compile();

    controller = module.get<TeacherApplicationController>(TeacherApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
