import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environment/.${process.env.NODE_ENV}.env`,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
