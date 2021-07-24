import { Module } from '@nestjs/common';
import { CheckLogsService } from './check-logs.service';
import { CheckLogsController } from './check-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckLog } from '../database/check-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckLog])],
  controllers: [CheckLogsController],
  providers: [CheckLogsService],
  exports: [CheckLogsService, TypeOrmModule],
})
export class CheckLogsModule {}
