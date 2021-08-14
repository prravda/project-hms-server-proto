import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'health check',
    description: 'api for health check',
  })
  @ApiOkResponse({
    description: 'return status code 200',
  })
  @Get()
  healthCheck(): string {
    return;
  }
}
