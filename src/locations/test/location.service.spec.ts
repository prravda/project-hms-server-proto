import { LocationsService } from '../locations.service';
import { Test } from '@nestjs/testing';
// import { Repository } from 'typeorm';
import { Location } from '../../database/location.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});

describe('Location Service Testing', () => {
  let locationsService: LocationsService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockRepository(),
        },
        ConfigService,
      ],
    }).compile();
    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });

  it('should create an location with valid longitude and latitude', async () => {
    const result = await locationsService.createLocationWithCoordinates({
      longitude: 12.123,
      latitude: 12.123,
    });
    console.log(result);
  });
});
