import { Module } from '@nestjs/common';
import { CheckLogsService } from './check-logs.service';
import { CheckLogsController } from './check-logs.controller';

@Module({
  controllers: [CheckLogsController],
  providers: [CheckLogsService]
})
export class CheckLogsModule {}
