import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsGateway } from './services/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environment/.${process.env.NODE_ENV}.env`,
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  providers: [EventsGateway],
})
export class AppModule {}
