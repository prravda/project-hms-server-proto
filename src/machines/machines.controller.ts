import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateCheckLogOnMachineDto } from './dto/create-check-log-on-machine.dto';
import { FindMachineDto } from './dto/find-machine.dto';
import { UplinkMessageWebHookDto } from './dto/uplink-message-webhook.dto';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MachineAndLogWithLocation } from './documents/machine-and-log-with-location.schema';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post('/log')
  @ApiExcludeEndpoint()
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
  @ApiExcludeEndpoint()
  async subscribeUplinkMessage(
    @Body() uplinkMessageWebHookDto: UplinkMessageWebHookDto,
  ) {
    try {
      const payloadData: CreateCheckLogOnMachineDto =
        uplinkMessageWebHookDto.uplink_message.decoded_payload;
      return await this.machinesService.createCheckLogOnMachine(payloadData);
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: '모든 기기의 위치정보, 그리고 기록들을 가져옵니다.',
    description:
      '기기를 기준으로 그 기기의 위치정보, 그리고 그 기기에 쓰여진 기록들을 가져옵니다.',
  })
  @ApiOkResponse({
    description:
      '요청에 성공하여 기기의 위치정보, 기기의 정보, 그리고 그 기기의 기록들을 가져옵니다.',
    type: [MachineAndLogWithLocation],
  })
  @Get('/log')
  async findMachineAndItsLog(@Query() findMachineDto: FindMachineDto) {
    if (!findMachineDto.machineUUID) {
      return await this.machinesService.findAllMachineAndItsLog();
    }
    return await this.machinesService.findMachineAndItsLog(findMachineDto);
  }
}
