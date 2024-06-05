import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PenjualanService } from './penjualan.service';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import {
  CreateOrderDto,
  UpdateOrderDto,
  findAllOrderDto,
} from './penjualan.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-update_by.decorator';

@UseGuards(JwtGuard)
@Controller('penjualan')
export class PenjualanController {
  constructor(private readonly penjualanService: PenjualanService) {}

  @Post('tambah')
  async createOrder(@InjectCreatedBy() payload: CreateOrderDto) {
    return this.penjualanService.createOrder(payload);
  }

  @Get('list')
  async listOrder(@Pagination() query: findAllOrderDto) {
    return this.penjualanService.findAll(query);
  }

  @Get('detail/:id')
  async detailOrder(@Param('id') id: string) {
    return this.penjualanService.findById(+id);
  }

  @Put('update/:id')
  async updateOrder(
    @Param('id') id: number,
    @InjectUpdatedBy() payload: UpdateOrderDto,
  ) {
    return this.penjualanService.update(+id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.penjualanService.delete(+id);
  }
}
