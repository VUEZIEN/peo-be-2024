import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class ProdukDto {
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsString()
  nama_produk: string;

  @IsNotEmpty()
  @IsInt()
  harga: number;

  @IsInt()
  stok: number;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateprodukDto extends OmitType(ProdukDto, [
  'updated_by',
  'id',
]) {}

export class UpdateprodukDto extends OmitType(ProdukDto, [
  'id',
  'created_by',
]) {}

export class findAllProdukDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_produk: string;

  @IsInt()
  @IsOptional()
  harga: number;

  @IsString()
  @IsOptional()
  keyword: string;
}
