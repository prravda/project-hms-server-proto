import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from '../database/machine.entity';
import { LocationsModule } from '../locations/locations.module';
import { CheckLogsModule } from '../check-logs/check-logs.module';

@Module({
  imports: [
    LocationsModule,
    CheckLogsModule,
    TypeOrmModule.forFeature([Machine]),
  ],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}
