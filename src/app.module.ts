import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { ProdukModule } from './app/produk/produk.module';
import { PelangganModule } from './app/pelanggan/pelanggan.module';
import { DetailpenjualanModule } from './app/detailpenjualan/detailpenjualan.module';
import { PenjualanModule } from './app/penjualan/penjualan.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    MailModule,
    ProdukModule,
    PelangganModule,
    DetailpenjualanModule,
    PenjualanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
