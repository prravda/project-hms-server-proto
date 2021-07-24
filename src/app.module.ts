import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';
import { LocationsModule } from './locations/locations.module';
import { CheckLogsModule } from './check-logs/check-logs.module';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [MachinesModule, LocationsModule, CheckLogsModule, MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
