// src/produk.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { DetailPenjualan } from '../detailpenjualan/detailpenjualan.entity';
import { User } from '../auth/auth.entity';

@Entity()
export class Produk extends BaseEntity {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama_produk: string;

  @Column({ nullable: false })
  harga: number;

  @Column({ nullable: false })
  stok: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.produk_created_by)
  created_by: User;

  @ManyToOne(() => User, (user) => user.produk_updated_by)
  updated_by: User;
}
