import { Test, TestingModule } from '@nestjs/testing';
import { CourseMaterialController } from './course-material.controller';
import { CourseMaterialService } from './course-material.service';

describe('CourseMaterialController', () => {
  let controller: CourseMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseMaterialController],
      providers: [CourseMaterialService],
    }).compile();

    controller = module.get<CourseMaterialController>(CourseMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
