import { Module } from '@nestjs/common';
import { DetailpenjualanController } from './detailpenjualan.controller';
import { DetailpenjualanService } from './detailpenjualan.service';

@Module({
  controllers: [DetailpenjualanController],
  providers: [DetailpenjualanService],
})
export class DetailpenjualanModule {}
