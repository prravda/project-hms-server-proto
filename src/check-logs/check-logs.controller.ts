import { Controller } from '@nestjs/common';
import { CheckLogsService } from './check-logs.service';

@Controller('check-logs')
export class CheckLogsController {
  constructor(private readonly checkLogsService: CheckLogsService) {}
}
