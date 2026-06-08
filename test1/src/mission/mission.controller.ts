import { Body, Controller, Get, Post } from '@nestjs/common';
import { mission } from './entities/mission.entity';
import { MissionService } from './mission.service';

@Controller('missions')
export class MissionController {
    
    constructor(private missionService:  MissionService){

    }

    @Get('getMissions')
    async getMissions(): Promise<mission[]> {
      return await this.missionService.getMissions();
    }
    @Post("saveMission")
    async save(@Body() mission: mission) {
      return await this.missionService.saveMission(mission);
    }

}
