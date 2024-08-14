import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirBus } from './schemas/AirBus.schema';
import { City } from './schemas/City.schema';
import { Company } from './schemas/Company.schema';
import { Order } from './schemas/Order.schema';
import { Path } from './schemas/Path.schema';
import { Trip } from './schemas/Trip.schema';
import { User } from './schemas/User.schema';
import { FlightModule } from './flight/flight.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { SeatClass } from './schemas/SeatClass.schema';
import { UserModule } from './user/user.module';
import { JwtGuard } from './auth/guards/JwtGuard';
import { OrderModule } from './order/order.module';
import { LovesModule } from './loves/loves.module';
import { Loves } from './schemas/Loves.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'production' ? '.prod.env' : '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'static'),
      serveRoot: '/static', 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.11.2.210',
      port: +process.env.POSTGRESQL_PORT,
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASS,
      database: process.env.POSTGRESQL_DB,
      entities: [
        SeatClass,
        AirBus,
        City,
        Company,
        Order,
        Path,
        Trip,
        User,
        Loves,
      ],
      synchronize: true,
    }),
    FlightModule,
    AuthModule,
    UserModule,
    OrderModule,
    LovesModule
  ],
  controllers: [AppController],
  providers: [AppService,  {provide:APP_GUARD, useClass:JwtGuard}],
})
export class AppModule {}
