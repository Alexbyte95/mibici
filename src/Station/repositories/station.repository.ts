import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StationDocument } from '../infrastructure/persistence/station.schema';

@Injectable()
export class StationRepository {
  constructor(
    @InjectModel('Station') private stationModel: Model<StationDocument>,
  ) {}

  async findNearbyStations(
    latitude: number,
    longitude: number,
    distance: number,
  ): Promise<StationDocument[]> {
    try {
      return this.stationModel
        .find({
          latitude: {
            $gte: latitude - distance / 69,
            $lte: latitude + distance / 69,
          },
          longitude: {
            $gte:
              longitude - distance / 69 / Math.cos((latitude * Math.PI) / 180),
            $lte:
              longitude + distance / 69 / Math.cos((latitude * Math.PI) / 180),
          },
          status: 'IN_SERVICE',
        })
        .exec();
    } catch (error) {
      console.error('Error fetching nearby stations:', error);
      throw new Error('Could not fetch nearby stations');
    }
  }
}
