// src/detailpenjualan.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Penjualan } from '../penjualan/penjual.entity';
import { Produk } from '../produk/produk.entity';
import { User } from '../auth/auth.entity';

@Entity()
export class DetailPenjualan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  jumlah_produk: number;

  @Column({ nullable: false })
  Subtotal: number;

  @ManyToOne(() => Produk, (produk) => produk.detailPenjualans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'produk_id' })
  produk: Produk;

  @ManyToOne(() => Penjualan, (penjualan) => penjualan.detail_penjualan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'penjualan_id' })
  penjualan: Penjualan;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
