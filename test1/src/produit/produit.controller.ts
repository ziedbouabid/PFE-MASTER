import { Controller, Get } from '@nestjs/common';
import { produit } from './entities/produit.entity';
import { ProduitService } from './produit.service';

@Controller('produit')
export class ProduitController {

    constructor(private produitService: ProduitService){

    }
    @Get('getProduit')
    async getProduit(): Promise<produit[]> {
        return await this.produitService.getProduit();
      }



}

