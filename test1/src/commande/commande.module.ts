import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { mission } from 'src/mission/entities/mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande]),TypeOrmModule.forFeature([mission])],
  providers: [CommandeService],
  controllers: [CommandeController],
  exports: [CommandeService]
})
export class CommandeModule { }
