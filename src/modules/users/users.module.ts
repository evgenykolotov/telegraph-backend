import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [PrismaService, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
