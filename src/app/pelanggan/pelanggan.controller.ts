import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PelangganService } from './pelanggan.service';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { CreatePelaganDto, findAllPelaganDto } from './pelangan.dto';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('pelanggan')
export class PelangganController {
  constructor(private pelaganService: PelangganService) {}
  @Post('create')
  async create(@InjectCreatedBy() payload: CreatePelaganDto) {
    return this.pelaganService.create(payload);
  }

  @Get('list')
  async findAll(@Query() query: findAllPelaganDto) {
    return this.pelaganService.findAll(query);
  }
}
