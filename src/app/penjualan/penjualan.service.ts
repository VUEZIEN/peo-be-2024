/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Penjualan } from './penjual.entity';
import { Like, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import {
  CreateOrderDto,
  UpdateOrderDto,
  findAllOrderDto,
} from './penjualan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';

@Injectable()
export class PenjualanService extends BaseResponse {
  constructor(
    @InjectRepository(Penjualan)
    private readonly penjualanRepository: Repository<Penjualan>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  generateInvoice(): string {
    return `INV` + new Date().getTime();
  }

  async createOrder(payload: CreateOrderDto): Promise<ResponseSuccess> {
    try {
      payload.detail_penjualan &&
        payload.detail_penjualan.forEach((item) => {
          item.created_by = this.req.user.id;
        });
      await this.penjualanRepository.save({
        ...payload,
        pelanggan: {
          id: payload.pelanggan_id,
        },
      });

      return this._success('OK');
    } catch (err) {
      console.log('err', err);

      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(query: findAllOrderDto): Promise<ResponsePagination> {
    const {
      page,
      pageSize,
      limit,
      dari_tanggal_penjualan,
      sampai_tanggal_penjualan,
      dari_total_harga,
      sampai_total_harga,
      nama_pelanggan,
    } = query;

    const filterQuery: any = [];

    if (nama_pelanggan) {
      filterQuery.pelaggan = {
        nama_pelanggan: Like(`%${nama_pelanggan}%`),
      };
    }

    const total = await this.penjualanRepository.count({
      where: filterQuery,
    });

    const result = await this.penjualanRepository.find({
      where: filterQuery,
      relations: [
        'created_by',
        'pelanggan',
        'detail_penjualan',
        'detail_penjualan.produk',
      ],
      select: {
        id: true,
        total_harga: true,
        tanggal_penjualan: true,

        pelanggan: {
          id: true,
          nama_pelanggan: true,
        },
        created_by: {
          id: true,
          nama: true,
        },

        detail_penjualan: {
          id: true,
          jumlah_produk: true,
          Subtotal: true,
          produk: {
            id: true,
          },
        },
      },

      skip: limit,
      take: pageSize,
    });
    return this._pagination('OK', result, total, page, pageSize);
  }

  async findById(id: number): Promise<ResponseSuccess> {
    const result = await this.penjualanRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'created_by',
        'pelanggan',
        'detail_penjualan',
        'detail_penjualan.produk',
      ],
      select: {
        id: true,
        total_harga: true,
        tanggal_penjualan: true,

        pelanggan: {
          id: true,
          nama_pelanggan: true,
        },
        created_by: {
          id: true,
          nama: true,
        },
        detail_penjualan: {
          id: true,
          jumlah_produk: true,
          Subtotal: true,
          produk: {
            id: true,
            nama_produk: true,
          },
        },
      },
    });

    return this._success('OK', result);
  }

  async update(id: number, payload: UpdateOrderDto): Promise<ResponseSuccess> {
    const check = await this.penjualanRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!check) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    payload.detail_penjualan &&
      payload.detail_penjualan.forEach((item) => {
        item.created_by = this.req.user.id;
      });

    const order = await this.penjualanRepository.save({ ...payload, id: id });

    return this._success('OK', order);
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const check = await this.penjualanRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`penjualan dengan id ${id} tidak ditemukan`);
    await this.penjualanRepository.delete(id);

    return this._success('Berhasil menghapus buku');
  }
}
