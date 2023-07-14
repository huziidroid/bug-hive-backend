import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login() {
    return await this.prismaService.tag.findMany();
  }

  async signup() {
    //
  }
}
