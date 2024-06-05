import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Produk } from './produk.entity';
import { REQUEST } from '@nestjs/core';
import { Like, Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import {
  CreateprodukDto,
  UpdateprodukDto,
  findAllProdukDto,
} from './produk.dto';

@Injectable()
export class ProdukService extends BaseResponse {
  constructor(
    @InjectRepository(Produk)
    private produkRepository: Repository<Produk>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async createProduk(payload: CreateprodukDto): Promise<ResponseSuccess> {
    try {
      const newProduk = await this.produkRepository.save({
        ...payload,
      });

      return this._success('Produk created successfully', newProduk);
    } catch (error) {
      throw new HttpException(`maaf ada eror`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const check = await this.produkRepository.findOne({
      where: {
        id: id,
      },
      relations: ['created_by', 'updated_by'],
    });

    if (check === null) {
      throw new NotFoundException(`Produk dengan id ${id} tidak di temukan`);
    }

    return {
      status: 'ok',
      message: 'berhasil',
      data: check,
    };
  }

  async update(id: number, payload: UpdateprodukDto): Promise<ResponseSuccess> {
    const kat = await this.produkRepository.findOne({
      where: {
        id: id,
      },
    });

    if (kat === null) {
      throw new NotFoundException(`Produl dengan id ${id} tidak di temukan`);
    }

    try {
      await this.produkRepository.save({ ...payload, id: id });
      return this._success('OK', this.req.user.user_id);
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const delet = await this.produkRepository.findOne({
      where: {
        id: id,
      },
    });

    if (delet === null) {
      throw new NotFoundException(`Produk dengan id ${id} tidak di temukan`);
    }
    const hapus = await this.produkRepository.delete(id);
    return {
      status: 'ok',
      message: 'Berhasil Menghapus Produk',
      data: hapus,
    };
  }

  async findAll(query: findAllProdukDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword, nama_produk, harga } = query;

    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          nama_produk: Like(`%${nama_produk}%`),
        },
        {
          harga: Like(`%${harga}%`),
        },
      );
    }
    const total = await this.produkRepository.count({
      where: filterKeyword,
    });
    const result = await this.produkRepository.find({
      where: filterKeyword,
      relations: ['created_by', 'updated_by'],
      select: {
        id: true,
        nama_produk: true,
        harga: true,
        stok: true,
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
