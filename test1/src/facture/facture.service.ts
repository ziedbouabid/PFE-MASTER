import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from 'src/commande/entities/commande.entity';
import { Repository } from 'typeorm';
import { Facture } from './entities/facture.entity';

@Injectable()
export class FactureService {
    constructor(
        @InjectRepository(Facture)
        private readonly factureRepository: Repository<Facture>,
        @InjectRepository(Commande)
        private readonly commandeRepository: Repository<Commande>, // Add Commande repository
    ) { }

    async createFacture(amount: number, commandeId): Promise<Facture> {
        const commande = await this.commandeRepository.findOne(commandeId);

        if (!commande) {
            throw new NotFoundException(`Commande with ID ${commandeId} not found`);
        }

        const facture = this.factureRepository.create({ amount, commande });
        return await this.factureRepository.save(facture);
    }

    async getFactureById(id): Promise<Facture> {
        const facture = await this.factureRepository.findOne(id);
        if (!facture) {
            throw new NotFoundException(`Facture with ID ${id} not found`);
        }
        return facture;
    }
}
