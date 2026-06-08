import { Controller, Post, Param, Get } from '@nestjs/common';
import { Facture } from './entities/facture.entity';
import { FactureService } from './facture.service';

@Controller('facture')
export class FactureController {

    constructor(private readonly factureService: FactureService) {}


    @Post(':amount/commande/:commandeId')
    async createFacture(
        @Param('amount') amount: number,
        @Param('commandeId') commandeId: number,
    ): Promise<Facture> {
        return await this.factureService.createFacture(amount, commandeId);
    }

    @Get(':id')
    async getFactureById(@Param('id') id: number): Promise<Facture> {
        return await this.factureService.getFactureById(id);
    }
}
