import { Test, TestingModule } from '@nestjs/testing';
import { CheckLogsService } from './check-logs.service';

describe('CheckLogsService', () => {
  let service: CheckLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckLogsService],
    }).compile();

    service = module.get<CheckLogsService>(CheckLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
