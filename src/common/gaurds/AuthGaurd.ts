import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ERROR_MESSAGES, JWT_SECRET, TJwtPayload } from 'src/shared';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get isPublic flag from metadata
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if route is marked as public, do not apply gaurd to it
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(ERROR_MESSAGES.NO_ACCESS_TOKEN);
    }

    try {
      const payload = await this.jwtService.verifyAsync<TJwtPayload>(token, {
        secret: JWT_SECRET,
      });

      request['user'] = { userId: payload.sub, email: payload.email };

      return true;
    } catch (error) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
