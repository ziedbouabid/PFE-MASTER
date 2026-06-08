import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {

    constructor(@InjectRepository(produit) private produitRepository: Repository<produit>,){
        
    }

    async getProduit(): Promise<produit[]> {
        return await this.produitRepository.find();
      }
}
