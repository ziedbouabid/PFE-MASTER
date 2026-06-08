import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { fournisseur } from './entities/fournisseur.entity';

@Injectable()
export class FournisseurService {

    constructor(@InjectRepository(fournisseur) private fournisseurRepository: Repository<fournisseur>,){

    }
    async getFournisseurs(): Promise<fournisseur[]> {
        return await this.fournisseurRepository.find({
          relations: {
            competences : true,
            certifications: true
        },
        });
      }

      async saveFournisseur(fournisseur : fournisseur): Promise<fournisseur> {
        try{
          return await this.fournisseurRepository.save(fournisseur)
        }
        catch(e ){
          console.log(e)
        }
      }

      async updateFournisseur(fournisseur : fournisseur): Promise<fournisseur> {
        try{
          return await this.fournisseurRepository.save(fournisseur)
        }
        catch(e ){
          console.log(e)
        }
      }
}
