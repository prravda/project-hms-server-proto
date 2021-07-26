import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateCheckLogOnMachineDto } from './dto/create-check-log-on-machine.dto';
import { FindMachineDto } from './dto/find-machine.dto';
import { UplinkMessageWebHookDto } from './dto/uplink-message-webhook.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post('/log')
  async createCheckLogOnMachine(
    @Body() createCheckLogOnMachineDto: CreateCheckLogOnMachineDto,
  ) {
    try {
      return await this.machinesService.createCheckLogOnMachine(
        createCheckLogOnMachineDto,
      );
    } catch (e) {
      throw e;
    }
  }

  @Post('/uplink')
  async subscribeUplinkMessage(
    @Body() uplinkMessageWebHookDto: UplinkMessageWebHookDto,
  ) {
    try {
      const payloadData: CreateCheckLogOnMachineDto =
        uplinkMessageWebHookDto.uplink_message.decoded_payload;
      console.log(JSON.stringify(payloadData));
      return await this.machinesService.createCheckLogOnMachine(payloadData);
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
