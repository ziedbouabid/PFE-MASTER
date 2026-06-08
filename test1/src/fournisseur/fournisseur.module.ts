import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fournisseur } from './entities/fournisseur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([fournisseur])],
  providers: [FournisseurService],
  controllers: [FournisseurController]
})
export class FournisseurModule {}
