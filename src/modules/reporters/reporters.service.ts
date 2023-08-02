import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ERROR_MESSAGES } from 'src/shared';

@Injectable()
export class ReportersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllReporters() {
    try {
      const reporters = await this.prismaService.reporter.findMany({
        include: { role: { select: { name: true, id: true } } },
      });
      return reporters;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // get single Reporter
  async getReporterById(id: string) {
    try {
      const reporter = await this.prismaService.reporter.findFirstOrThrow({
        where: { id },
        include: { role: { select: { id: true, name: true } } },
      });
      return reporter;
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
