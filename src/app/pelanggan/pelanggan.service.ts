import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Like, Repository } from 'typeorm';
import { Pelanggan } from './pelaggan.entity';
import { CreatePelaganDto, findAllPelaganDto } from './pelangan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';

@Injectable()
export class PelangganService extends BaseResponse {
  constructor(
    @InjectRepository(Pelanggan)
    private readonly pelangganRepository: Repository<Pelanggan>,
  ) {
    super();
  }

  async create(payload: CreatePelaganDto): Promise<ResponseSuccess> {
    try {
      await this.pelangganRepository.save(payload);

      return this._success('OK');
    } catch (err) {
      console.log('err', err);
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(query: findAllPelaganDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword } = query;

    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          nama_pelanggan: Like(`%${keyword}%`),
        },
        {
          alamat: Like(`%${keyword}%`),
        },
        {
          nomor_telepon: Like(`%${keyword}%`),
        },
      );
    }
    const total = await this.pelangganRepository.count({
      where: filterKeyword,
    });
    const result = await this.pelangganRepository.find({
      where: filterKeyword,
      relations: ['created_by', 'updated_by'],
      select: {
        id: true,
        nama_pelanggan: true,
        alamat: true,
        nomor_telepon: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });
    return this._pagination('OK', result, total, page, pageSize);
  }
}
