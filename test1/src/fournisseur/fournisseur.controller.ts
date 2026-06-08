import { Body, Controller, Get, Post } from '@nestjs/common';
import { fournisseur } from './entities/fournisseur.entity';
import { FournisseurService } from './fournisseur.service';

@Controller('fournisseur')
export class FournisseurController {
    constructor(private fournisseurService:  FournisseurService){

    }
  @Get('getfournisseurs')
  async getUser(): Promise<fournisseur[]> {
    return await this.fournisseurService.getFournisseurs();

  }

  @Post("saveFournisseur")
  async save(@Body() fournisseur: fournisseur) {
    return await this.fournisseurService.saveFournisseur(fournisseur);
  }

  @Post("updateFournisseur")
  async update(@Body() fournisseur: fournisseur) {
    return await this.fournisseurService.updateFournisseur(fournisseur);
  }

}