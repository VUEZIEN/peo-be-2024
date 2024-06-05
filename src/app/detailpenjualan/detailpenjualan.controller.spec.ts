import { Test, TestingModule } from '@nestjs/testing';
import { DetailpenjualanController } from './detailpenjualan.controller';

describe('DetailpenjualanController', () => {
  let controller: DetailpenjualanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailpenjualanController],
    }).compile();

    controller = module.get<DetailpenjualanController>(
      DetailpenjualanController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
