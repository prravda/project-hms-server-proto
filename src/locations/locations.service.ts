import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../database/location.entity';
import { Repository } from 'typeorm';
import {
  camelCaseRoadAddress,
  CreateLocationDto,
} from './dto/create-location.dto';
import { ConfigService } from '@nestjs/config';
import { ParseToHumanReadableLocationDto } from './dto/parse-to-human-readable-location.dto';
import { HttpService } from '@nestjs/axios';
import { KakaoConfig } from '../config/kakao.config';
import { map } from 'rxjs/operators';
import {
  KakaoCoord2addressResponseInterface,
  KakaoRoadAddress,
} from './interface/kakao-coord2address-response.interface';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async parseToHumanReadableLocation(
    parseToHumanReadableLocationDto: ParseToHumanReadableLocationDto,
  ): Promise<CreateLocationDto> {
    const kakaoConstants = this.configService.get<KakaoConfig>('kakao');
    const roadAddress = await this.httpService
      .get<KakaoCoord2addressResponseInterface>(kakaoConstants.url, {
        headers: { Authorization: `KakaoAK ${kakaoConstants.restApiKey}` },
        params: {
          x: parseToHumanReadableLocationDto.longitude,
          y: parseToHumanReadableLocationDto.latitude,
        },
      })
      .pipe(map((res) => res.data.documents[0].road_address))
      .pipe(map((address) => this.parseResponseToCreateLocationDto(address)))
      .toPromise();

    return {
      ...parseToHumanReadableLocationDto,
      ...roadAddress,
    } as CreateLocationDto;
  }

  parseResponseToCreateLocationDto(
    snakeCaseRoadAddress: KakaoRoadAddress,
  ): camelCaseRoadAddress {
    return {
      addressDepth1: snakeCaseRoadAddress.region_1depth_name,
      addressDepth2: snakeCaseRoadAddress.region_2depth_name,
      addressDepth3: snakeCaseRoadAddress.region_3depth_name,
      fullAddress: snakeCaseRoadAddress.address_name,
      locationZoneNumber: snakeCaseRoadAddress.zone_no,
    };
  }

  async createLocationWithCoordinates(
    coordinates: ParseToHumanReadableLocationDto,
  ): Promise<Location> {
    const locationProperties = await this.parseToHumanReadableLocation(
      coordinates,
    );
    const locationEntity = this.locationRepository.create(locationProperties);
    return await this.locationRepository.save<Location>(locationEntity);
  }
}
