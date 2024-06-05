// src/penjualan.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Pelanggan } from '../pelanggan/pelaggan.entity';
import { DetailPenjualan } from '../detailpenjualan/detailpenjualan.entity';
import { User } from '../auth/auth.entity';

@Entity()
export class Penjualan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  tanggal_penjualan: Date;

  @Column({ type: 'double', precision: 18, scale: 2, nullable: false })
  total_harga: number;

  @ManyToOne(() => Pelanggan, (v) => v.penjualan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pelanggan_id' })
  pelanggan: Pelanggan;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @OneToMany(() => DetailPenjualan, (v) => v.penjualan, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  detail_penjualan: DetailPenjualan[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
