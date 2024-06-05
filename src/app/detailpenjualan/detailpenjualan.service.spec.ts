import { Test, TestingModule } from '@nestjs/testing';
import { DetailpenjualanService } from './detailpenjualan.service';

describe('DetailpenjualanService', () => {
  let service: DetailpenjualanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailpenjualanService],
    }).compile();

    service = module.get<DetailpenjualanService>(DetailpenjualanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
