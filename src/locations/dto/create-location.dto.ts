import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { Location } from '../../database/location.entity';

export class camelCaseRoadAddress extends PickType(Location, [
  'addressDepth1',
  'addressDepth2',
  'addressDepth3',
  'fullAddress',
  'locationZoneNumber',
] as const) {}

export class CreateLocationDto extends IntersectionType(
  camelCaseRoadAddress,
  PickType(Location, ['longitude', 'latitude'] as const),
) {}

export type camelCaseNormalAddress = camelCaseRoadAddress;
