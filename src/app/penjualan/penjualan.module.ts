import { Module } from '@nestjs/common';
import { PenjualanController } from './penjualan.controller';
import { PenjualanService } from './penjualan.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Penjualan } from './penjual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penjualan])],
  controllers: [PenjualanController],
  providers: [PenjualanService],
})
export class PenjualanModule {}
