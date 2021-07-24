import { Body, Controller, Post } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { ParseToHumanReadableLocationDto } from '../locations/dto/parse-to-human-readable-location.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  async createMachine(@Body() coordinates: ParseToHumanReadableLocationDto) {
    return await this.machinesService.createMachine(coordinates);
  }
}
