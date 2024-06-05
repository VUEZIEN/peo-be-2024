import { Module } from '@nestjs/common';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/auth.entity';
import { Produk } from './produk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Produk])],
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}
