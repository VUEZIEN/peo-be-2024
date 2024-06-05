import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsIn,
  IsNumber,
  IsDate,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { DetailPenjualanDto } from '../detailpenjualan/detailpenjualan.dto';

export class OrderDto {
  @IsInt()
  id: number;

  @IsDate()
  @IsNotEmpty()
  tanggal_penjualan: Date;

  @IsNumber()
  @IsNotEmpty()
  total_harga: number;

  @IsNumber()
  @IsNotEmpty()
  pelanggan_id: number;

  @IsObject()
  @IsOptional()
  updated_by: { id: number };

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @ValidateNested({ each: true })
  @Type(() => DetailPenjualanDto)
  detail_penjualan: DetailPenjualanDto[];
}

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'updated_by']) {}

export class UpdateOrderDto extends PartialType(OrderDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
export class findAllOrderDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_pelanggan: string;

  @IsString()
  @IsOptional()
  dari_tanggal_penjualan: Date;

  @IsString()
  @IsOptional()
  sampai_tanggal_penjualan: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  dari_total_harga: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sampai_total_harga: number;

  @IsString()
  @IsOptional()
  status: string;
}
