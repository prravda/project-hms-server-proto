import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ParseToHumanReadableLocationDto } from './dto/parse-to-human-readable-location.dto';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiExcludeEndpoint()
  async createLocation(@Body() coordinates: ParseToHumanReadableLocationDto) {
    return await this.locationsService.createLocationWithCoordinates(
      coordinates,
    );
  }
}
