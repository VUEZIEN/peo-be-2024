import { Module } from '@nestjs/common';
import { PelangganController } from './pelanggan.controller';
import { PelangganService } from './pelanggan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelanggan } from './pelaggan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelanggan])],
  controllers: [PelangganController],
  providers: [PelangganService],
})
export class PelangganModule {}
