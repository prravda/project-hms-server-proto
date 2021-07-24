import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../database/location.entity';
import { Repository } from 'typeorm';
import {
  camelCaseNormalAddress,
  camelCaseRoadAddress,
  CreateLocationDto,
} from './dto/create-location.dto';
import { ConfigService } from '@nestjs/config';
import { ParseToHumanReadableLocationDto } from './dto/parse-to-human-readable-location.dto';
import { HttpService } from '@nestjs/axios';
import { KakaoConfig } from '../config/kakao.config';
import { catchError, map } from 'rxjs/operators';
import {
  KakaoAddress,
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
    try {
      const kakaoConstants = this.configService.get<KakaoConfig>('kakao');
      const roadAddress = await this.httpService
        .get<KakaoCoord2addressResponseInterface>(kakaoConstants.url, {
          headers: { Authorization: `KakaoAK ${kakaoConstants.restApiKey}` },
          params: {
            x: parseToHumanReadableLocationDto.longitude,
            y: parseToHumanReadableLocationDto.latitude,
          },
        })
        .pipe(map((res) => res.data.documents[0]))
        .pipe(
          map((document) => {
            if (document.road_address) {
              return this.parseSnakeRoadAddressToCamelCase(
                document.road_address,
              );
            }

            if (document.address) {
              return this.parseSnakeNormalAddressToCamelCase(document.address);
            }
          }),
        )
        .pipe(
          catchError((err) => {
            throw new BadRequestException({
              statusCode: HttpStatus.BAD_REQUEST,
              message:
                '해당 좌표로 찾을 수 있는 도로명주소 및 일반주소가 존재하지 않습니다.',
            });
          }),
        )
        .toPromise();

      return {
        ...parseToHumanReadableLocationDto,
        ...roadAddress,
      } as CreateLocationDto;
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  parseSnakeRoadAddressToCamelCase(
    snakeCaseRoadAddress: KakaoRoadAddress,
  ): camelCaseRoadAddress {
    try {
      return {
        addressDepth1: snakeCaseRoadAddress.region_1depth_name,
        addressDepth2: snakeCaseRoadAddress.region_2depth_name,
        addressDepth3: snakeCaseRoadAddress.region_3depth_name,
        fullAddress: snakeCaseRoadAddress.address_name,
        locationZoneNumber: snakeCaseRoadAddress.zone_no,
      };
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  parseSnakeNormalAddressToCamelCase(
    snakeCaseNormalAddress: KakaoAddress,
  ): camelCaseNormalAddress {
    try {
      return {
        addressDepth1: snakeCaseNormalAddress.region_1depth_name,
        addressDepth2: snakeCaseNormalAddress.region_2depth_name,
        addressDepth3: snakeCaseNormalAddress.region_3depth_name,
        fullAddress: snakeCaseNormalAddress.address_name,
        locationZoneNumber: 'not supported',
      };
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }

  async createLocationWithCoordinates(
    coordinates: ParseToHumanReadableLocationDto,
  ): Promise<Location> {
    try {
      const locationProperties = await this.parseToHumanReadableLocation(
        coordinates,
      );
      const locationEntity = this.locationRepository.create(locationProperties);
      return await this.locationRepository.save<Location>(locationEntity);
    } catch (e) {
      Error.captureStackTrace(e);
      throw e;
    }
  }
}
