import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Machine } from '../database/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from '../locations/locations.service';
import { CheckLogsService } from '../check-logs/check-logs.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { FindMachineDto } from './dto/find-machine.dto';
import { CreateCheckLogOnMachineDto } from './dto/create-check-log-on-machine.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly locationService: LocationsService,
    private readonly checkLogService: CheckLogsService,
  ) {}

  async createMachine(createMachineDto: CreateMachineDto) {
    try {
      const { machineUUID } = createMachineDto;
      const machine = this.machineRepository.create({ machineUUID });
      const location = await this.locationService.createLocationWithCoordinates(
        createMachineDto,
      );
      machine.location = location;
      return await this.machineRepository.save<Machine>(machine);
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  async findMachine(
    findMachineDto: FindMachineDto,
    options?: FindOneOptions<Machine>,
  ): Promise<Machine> {
    try {
      const { machineUUID } = findMachineDto;
      return await this.machineRepository.findOne({
        where: { machineUUID },
        ...options,
      });
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  async findOrCreateMachine(
    createMachineDto: CreateMachineDto,
  ): Promise<Machine> {
    try {
      const { machineUUID } = createMachineDto;
      const machineFromDatabase = await this.findMachine({ machineUUID });
      if (machineFromDatabase) {
        return machineFromDatabase;
      }
      return await this.createMachine(createMachineDto);
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  async createCheckLogOnMachine(
    createCheckLogOnMachineDto: CreateCheckLogOnMachineDto,
  ) {
    try {
      const { ss, ...createMachineDto } = createCheckLogOnMachineDto;
      const machine = await this.findOrCreateMachine(createMachineDto);

      const checkLog = this.checkLogService.createCheckLog({ ss });
      checkLog.machine = machine;
      await this.checkLogService.saveCheckLog(checkLog);

      await this.machineRepository.save<Machine>(machine);
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  async findMachineAndItsLog(findMachineDto: FindMachineDto) {
    try {
      const { machineUUID } = findMachineDto;
      return this.machineRepository.findOne({
        where: { machineUUID },
        relations: ['checkLogs', 'location'],
      });
    } catch (e) {
      throw e;
    }
  }

  async findAllMachineAndItsLog() {
    try {
      return await this.machineRepository.find({
        relations: ['checkLogs', 'location'],
      });
    } catch (e) {
      throw e;
    }
  }
}
