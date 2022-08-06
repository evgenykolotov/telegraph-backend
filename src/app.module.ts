import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environment/.${process.env.NODE_ENV}.env`,
    }),
  ],
})
export class AppModule {}
