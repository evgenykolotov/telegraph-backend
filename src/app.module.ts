import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { EventsGateway } from './services/events.gateway';
import { UsersModule } from './modules/users/users.module';

/**
 * @class
 * @name AppModule
 * @classdesc Главный модуль в приложениии.
 */
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
