import { IsNumber } from 'class-validator';

export class ParseToHumanReadableLocationDto {
  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;
}
