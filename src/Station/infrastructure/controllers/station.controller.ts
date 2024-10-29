import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { StationService } from '../../application/station.service';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  getStations(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('distance') distance: string,
  ) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const dist = parseFloat(distance);
    if (isNaN(lat) || isNaN(lng) || isNaN(dist)) {
      throw new BadRequestException('Invalid latitude, longitude or distance.');
    }
    return this.stationService.findStations(lat, lng, dist);
  }
}
