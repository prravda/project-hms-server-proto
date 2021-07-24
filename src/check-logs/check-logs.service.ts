import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckLog } from '../database/check-log.entity';
import { Repository } from 'typeorm';
import { CreateCheckLogDto } from './dto/create-check-log.dto';

@Injectable()
export class CheckLogsService {
  constructor(
    @InjectRepository(CheckLog)
    private readonly checkLogRepository: Repository<CheckLog>,
  ) {}

  createCheckLog(createCheckLogDto: CreateCheckLogDto) {
    return this.checkLogRepository.create(createCheckLogDto);
  }

  async saveCheckLog(log: CheckLog) {
    return await this.checkLogRepository.save<CheckLog>(log);
  }
}
