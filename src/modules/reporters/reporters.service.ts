import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { ERROR_MESSAGES, paginator } from 'src/shared';
import { FindAllQueryParams } from './dtos';
import { ReporterEntity } from 'src/entities';

@Injectable()
export class ReportersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ page = 1, perPage = 10 }: FindAllQueryParams) {
    try {
      return await paginator<ReporterEntity, Prisma.ReporterFindManyArgs>(
        this.prismaService.reporter,
        ReporterEntity,
        { page, perPage },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // get single Reporter
  async findOne(id: string) {
    try {
      const reporter = await this.prismaService.reporter.findFirstOrThrow({
        where: { id },
        include: { role: { select: { id: true, name: true } } },
      });
      return new ReporterEntity(reporter);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
        }
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
