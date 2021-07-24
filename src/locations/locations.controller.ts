import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ParseToHumanReadableLocationDto } from './dto/parse-to-human-readable-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // 37.663138196804645, 127.12710950979434
  @Get()
  async test() {
    return 'hello';
  }
  @Post()
  async createLocation(@Body() coordinates: ParseToHumanReadableLocationDto) {
    return await this.locationsService.createLocationWithCoordinates(
      coordinates,
    );
  }
}
