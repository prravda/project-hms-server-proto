import { Test, TestingModule } from '@nestjs/testing';
import { CheckLogsController } from './check-logs.controller';
import { CheckLogsService } from './check-logs.service';

describe('CheckLogsController', () => {
  let controller: CheckLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckLogsController],
      providers: [CheckLogsService],
    }).compile();

    controller = module.get<CheckLogsController>(CheckLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
