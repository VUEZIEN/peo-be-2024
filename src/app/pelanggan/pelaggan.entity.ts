// src/pelanggan.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Penjualan } from '../penjualan/penjual.entity';
import { User } from '../auth/auth.entity';

@Entity()
export class Pelanggan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama_pelanggan: string;

  @Column({ type: 'text', nullable: false })
  alamat: string;

  @Column({ nullable: false })
  nomor_telepon: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.pelanggan_created_by)
  created_by: User;

  @ManyToOne(() => User, (user) => user.pelanggan_updated_by)
  updated_by: User;

  penjualan: any;
}
