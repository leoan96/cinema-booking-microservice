import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appEnvironmentConfiguration } from './app.env.configuration';
import { LoggerModule } from './logger/logger.module';
import { bookingEnvironmentConfiguration } from './module/booking/booking.env.configuration';
import { BookingModule } from './module/booking/booking.module';
import { jwtEnvironmentConfiguration } from './module/jwt/jwt.env.configuration';
import { JwtAuthenticationModule } from './module/jwt/jwt.module';
import { mongooseEnvironmentConfiguration } from './module/mongoose/mongoose.configuration';
import { MongooseClient } from './module/mongoose/mongoose.provider';
import { redisEnvironmentConfiguration } from './module/redis/redis.configuration';
import { RedisModule } from './module/redis/redis.module';
import { TicketModule } from './module/ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [
        appEnvironmentConfiguration,
        mongooseEnvironmentConfiguration,
        redisEnvironmentConfiguration,
        bookingEnvironmentConfiguration,
        jwtEnvironmentConfiguration,
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(MongooseClient),
    LoggerModule,
    RedisModule,
    BookingModule,
    TicketModule,
    JwtAuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
