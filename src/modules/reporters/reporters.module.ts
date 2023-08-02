import { Module } from '@nestjs/common';
import { ReportersController } from './reporters.controller';
import { ReportersService } from './reporters.service';

@Module({
  controllers: [ReportersController],
  providers: [ReportersService],
})
export class ReportersModule {}
