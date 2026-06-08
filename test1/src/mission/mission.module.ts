import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mission } from './entities/mission.entity';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';

@Module({
  imports: [TypeOrmModule.forFeature([mission])],
  controllers: [MissionController],
  providers: [MissionService]
})
export class MissionModule {}
