import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { competences } from 'src/competences/entities/competences.entity';
import { fournisseur } from 'src/fournisseur/entities/fournisseur.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande]),
    TypeOrmModule.forFeature([competences]),
    TypeOrmModule.forFeature([fournisseur]),
],
  providers: [SeedService]
})
export class SeedModule {}
