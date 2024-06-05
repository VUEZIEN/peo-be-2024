import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ResetPassword } from '../mail/reset_password.entity';
import { Pelanggan } from '../pelanggan/pelaggan.entity';
import { Produk } from '../produk/produk.entity';

export enum UserRole {
  Penjual = 'penjual',
  Pembeli = 'pembeli',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nama: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Penjual,
  })
  role: string;

  @OneToMany(() => ResetPassword, (reset) => reset.admins)
  reset_password: ResetPassword;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Pelanggan, (pelanggan) => pelanggan.created_by)
  pelanggan_created_by: Pelanggan[];

  @OneToMany(() => Pelanggan, (pelanggan) => pelanggan.updated_by)
  pelanggan_updated_by: Pelanggan[];

  @OneToMany(() => Produk, (produk) => produk.created_by)
  produk_created_by: Produk[];

  @OneToMany(() => Produk, (produk) => produk.updated_by)
  produk_updated_by: Produk[];
}
