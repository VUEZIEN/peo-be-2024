import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/auth.guard';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-update_by.decorator';
import {
  CreateprodukDto,
  UpdateprodukDto,
  findAllProdukDto,
} from './produk.dto';
import { ProdukService } from './produk.service';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';

@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(@InjectCreatedBy() payload: CreateprodukDto) {
    return this.produkService.createProduk(payload);
  }

  @Get('list')
  async findAll(@Query() query: findAllProdukDto) {
    return this.produkService.findAll(query);
  }

  @Put('update/:id')
  @UseGuards(JwtGuard)
  findOnepembelian(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateprodukDto,
  ) {
    return this.produkService.update(Number(id), payload);
  }

  @Get('detail/:id')
  @UseGuards(JwtGuard)
  getDetail(@Param('id') id: string) {
    return this.produkService.getDetail(Number(id));
  }

  @Delete('delete/:id')
  deleteProduk(@Param('id') id: string) {
    return this.produkService.delete(+id);
  }
}
