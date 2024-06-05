import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class PelagganDto {
  @IsInt()
  id: number;

  @IsString()
  nama_pelanggan: string;

  @IsString()
  alamat: string;

  @IsString()
  nomor_telepon: string;
}

export class CreatePelaganDto extends PickType(PelagganDto, [
  'nama_pelanggan',
  'alamat',
  'nomor_telepon',
]) {}

export class findAllPelaganDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_pelanggan: string;

  @IsString()
  @IsOptional()
  alamat: string;

  @IsString()
  @IsOptional()
  nomor_telepon: string;

  @IsString()
  @IsOptional()
  keyword: string;
}
