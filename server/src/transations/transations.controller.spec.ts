import { Test, TestingModule } from '@nestjs/testing';
import { TransationsController } from './transations.controller';

describe('TransationsController', () => {
  let controller: TransationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransationsController],
    }).compile();

    controller = module.get<TransationsController>(TransationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
