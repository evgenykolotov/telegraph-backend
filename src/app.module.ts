import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsGateway } from './services/events.gateway';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environment/.${process.env.NODE_ENV}.env`,
    }),
  ],
  providers: [PrismaService, EventsGateway],
})
export class AppModule {}
