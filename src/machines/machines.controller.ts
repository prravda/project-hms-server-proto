import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateCheckLogOnMachineDto } from './dto/create-check-log-on-machine.dto';
import { FindMachineDto } from './dto/find-machine.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post('/log')
  async createCheckLogOnMachine(
    @Body() createCheckLogOnMachineDto: CreateCheckLogOnMachineDto,
  ) {
    try {
      console.log(createCheckLogOnMachineDto);
      return await this.machinesService.createCheckLogOnMachine(
        createCheckLogOnMachineDto,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get('/log')
  async findMachineAndItsLog(@Query() findMachineDto: FindMachineDto) {
    if (!findMachineDto.machineUUID) {
      return await this.machinesService.findAllMachineAndItsLog();
    }
    return await this.machinesService.findMachineAndItsLog(findMachineDto);
  }
}
