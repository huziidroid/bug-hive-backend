import { Controller, Get, Param } from '@nestjs/common';

import { ReportersService } from './reporters.service';

@Controller('reporters')
export class ReportersController {
  constructor(private readonly reportersService: ReportersService) {}

  @Get()
  async findAll() {
    return this.reportersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reportersService.findOne(id);
  }
}
