import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetencesController } from './competences.controller';
import { CompetencesService } from './competences.service';
import { competences } from './entities/competences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([competences])],
  controllers: [CompetencesController],
  providers: [CompetencesService]
})
export class CompetencesModule {}
