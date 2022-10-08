import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { JSONWebTokenService } from './services/jsonwebtoken.service';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JSONWebTokenService],
  exports: [JSONWebTokenService],
})
export class AuthModule {}
