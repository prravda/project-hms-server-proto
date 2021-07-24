import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Machine } from '../database/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from '../locations/locations.service';
import { ParseToHumanReadableLocationDto } from '../locations/dto/parse-to-human-readable-location.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly locationService: LocationsService,
  ) {}

  async createMachine(coordinates: ParseToHumanReadableLocationDto) {
    const location = await this.locationService.createLocationWithCoordinates(
      coordinates,
    );
    const machine = this.machineRepository.create();
    machine.location = location;
    return await this.machineRepository.save<Machine>(machine);
  }
}
