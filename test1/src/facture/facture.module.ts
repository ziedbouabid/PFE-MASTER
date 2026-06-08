import { Module } from '@nestjs/common';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import { Facture } from './entities/facture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeModule } from 'src/commande/commande.module';
import { Commande } from 'src/commande/entities/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facture]),TypeOrmModule.forFeature([Commande])],
  providers: [FactureService],
  controllers: [FactureController],
  exports: [FactureService]
})
export class FactureModule {}
