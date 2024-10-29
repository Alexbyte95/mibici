import { Module } from '@nestjs/common';
import { StationController } from './infrastructure/controllers/station.controller';
import { StationSessionName } from './domain/station.entity';
import { StationService } from './application/station.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StationSchema } from './infrastructure/persistence/station.schema';
import { StationRepository } from './repositories/station.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StationSessionName, schema: StationSchema },
    ]),
  ],
  controllers: [StationController],
  providers: [StationService, StationRepository],
})
export class StationModule {}
