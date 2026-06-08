import { Controller, Get } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { competences } from './entities/competences.entity';

@Controller('competences')
export class CompetencesController {
    constructor(private CompetencesService: CompetencesService){

    }
    @Get('getCompetences')
    async getCompetences(): Promise<competences[]> {
        return await this.CompetencesService.getCompetencesTypes();
    }



}
