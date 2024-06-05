// DetailPenjualanDto.ts
import { IsInt, IsNumber, IsObject, IsOptional } from 'class-validator';

export class DetailPenjualanDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsInt()
  jumlah_produk: number;

  @IsNumber()
  Subtotal: number;

  @IsObject()
  produk: { id: number };

  @IsObject()
  @IsOptional()
  updated_by?: { id: number };

  @IsObject()
  @IsOptional()
  created_by?: { id: number };
}
