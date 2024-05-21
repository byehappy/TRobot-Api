import { Test, TestingModule } from '@nestjs/testing';
import { CourseMaterialController } from './course-material.controller';
import { AppModule } from '../app.module';

describe('CourseMaterialController', () => {
  let controller: CourseMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<CourseMaterialController>(CourseMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
