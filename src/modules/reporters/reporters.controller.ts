import { Controller, Get, Param } from '@nestjs/common';
import { ReportersService } from './reporters.service';

@Controller('reporters')
export class ReportersController {
  constructor(private readonly reportersService: ReportersService) {}

  @Get()
  async allReporters() {
    return this.reportersService.getAllReporters();
  }

  @Get(':id')
  async getReporterById(@Param('id') id: string) {
    return this.reportersService.getReporterById(id);
  }
}
