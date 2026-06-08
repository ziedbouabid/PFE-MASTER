import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { produit } from './entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';

@Module({
  imports: [TypeOrmModule.forFeature([produit])],
  controllers: [ProduitController],
  providers: [ProduitService]
})
export class ProduitModule {}
