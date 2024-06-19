import { Test, TestingModule } from '@nestjs/testing';
import { BbsController } from './bbs.controller';

describe('BbsController', () => {
  let controller: BbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BbsController],
    }).compile();

    controller = module.get<BbsController>(BbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
