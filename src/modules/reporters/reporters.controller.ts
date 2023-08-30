import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ReportersService } from './reporters.service';
import { FindAllQueryParams } from './dtos';
import { Serialize } from 'src/common';
import { ReporterEntity } from 'src/entities';
@Serialize(ReporterEntity)
@Controller('reporters')
export class ReportersController {
  constructor(private readonly reportersService: ReportersService) {}

  @Get()
  async findAll(@Query() query: FindAllQueryParams) {
    return this.reportersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reportersService.findOne(id);
  }
}
