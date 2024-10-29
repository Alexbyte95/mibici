import { Injectable } from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';

@Injectable()
export class StationService {
  constructor(private readonly stationRepository: StationRepository) {}

  findStations(latitude: number, longitude: number, distance: number) {
    return this.stationRepository.findNearbyStations(
      latitude,
      longitude,
      distance,
    );
  }
}
