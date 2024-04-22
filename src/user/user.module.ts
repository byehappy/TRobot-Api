import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { RefreshTokenStrategy } from '../common/strategy/refreshToken.strategy';
import { PrismaService } from '../prisma.service';
import { AccessTokenStrategy } from '../common/strategy/accessToken.strategy';

@Module({
  imports:[JwtModule.register({
    secret: process.env.SecretJWT,
  })],
  controllers: [UserController],
  providers: [UserService,PrismaService,RefreshTokenStrategy,AccessTokenStrategy],
})
export class UserModule {}
