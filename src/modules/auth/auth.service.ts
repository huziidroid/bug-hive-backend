import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LoginDTO, SignupDTO } from './dtos';
import { ERROR_MESSAGES } from 'src/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDTO) {
    const { email, password } = body;

    const user = await this.prismaService.reporter.findUnique({
      where: { email },
    });

    // if user not exists with provided email, throw exception.
    if (!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);

    const isPasswordMatched = await argon.verify(user.password, password);

    // if password not matched with provided password, throw error
    if (!isPasswordMatched)
      throw new UnauthorizedException(ERROR_MESSAGES.PASSWORD_NOT_MATCHED);

    // get access token from jwt service
    const token = await this.getAccessToken(user.id, user.email);
    return { access_token: token };
  }

  async signup(body: SignupDTO) {
    const { email, password, username, roleId } = body;

    try {
      // convert the plain password to hashed password
      const hash = await argon.hash(password);
      const user = await this.prismaService.reporter.create({
        data: { email, password: hash, username, roleId },
        include: { role: true },
      });

      // get access token from jwt service
      const token = await this.getAccessToken(user.id, user.email);
      return { access_token: token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getAccessToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return this.jwtService.signAsync(payload);
  }
}
