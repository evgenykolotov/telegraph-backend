import { AuthModule } from '../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [PrismaService, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
