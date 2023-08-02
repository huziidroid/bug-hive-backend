import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ReportersModule } from './modules/reporters/reporters.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './shared';
import { APP_GUARD } from '@nestjs/core';
import { AuthGaurd } from './common';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ReportersModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGaurd }],
})
export class AppModule {}
