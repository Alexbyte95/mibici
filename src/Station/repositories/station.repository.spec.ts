import { Test, TestingModule } from '@nestjs/testing';
import { StationRepository } from './station.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StationDocument } from '../infrastructure/persistence/station.schema';

describe('StationRepository', () => {
  let stationRepository: StationRepository;
  let stationModel: Model<StationDocument>;

  const mockStationModel = {
    find: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationRepository,
        {
          provide: getModelToken('Station'),
          useValue: mockStationModel,
        },
      ],
    }).compile();

    stationRepository = module.get<StationRepository>(StationRepository);
    stationModel = module.get<Model<StationDocument>>(getModelToken('Station'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return stations when nearby stations exist', async () => {
    const mockStations = [
      {
        id: '1',
        name: 'Station 1',
        obcn: 'GDL-001',
        location: 'Location 1',
        latitude: 20.666378,
        longitude: -103.34882,
        status: 'IN_SERVICE',
      },
    ];

    mockStationModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockStations),
    });

    const result = await stationRepository.findNearbyStations(
      20.666378,
      -103.34882,
      5,
    );
    expect(result).toEqual(mockStations);
    expect(mockStationModel.find).toHaveBeenCalled();
  });

  it('should return an empty array when no nearby stations exist', async () => {
    mockStationModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue([]),
    });

    const result = await stationRepository.findNearbyStations(0, 0, 5);
    expect(result).toEqual([]);
    expect(mockStationModel.find).toHaveBeenCalled();
  });
});
