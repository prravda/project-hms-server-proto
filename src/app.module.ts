import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';
import { LocationsModule } from './locations/locations.module';
import { CheckLogsModule } from './check-logs/check-logs.module';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import kakaoConfig from './config/kakao.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, kakaoConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get('database.local'),
    }),
    MachinesModule,
    LocationsModule,
    CheckLogsModule,
    MemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
