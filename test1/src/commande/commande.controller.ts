import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { Commande } from './entities/commande.entity';

@Controller('commandes')
export class CommandeController {
    constructor(private readonly commandeService: CommandeService) { }

    @Post()
    async create(@Body() commandeData: Partial<Commande>): Promise<Commande> {
        return await this.commandeService.create(commandeData);
    }

    @Get()
    async findAll(): Promise<Commande[]> {
        return await this.commandeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Commande> {
        return await this.commandeService.findOne(id);
    }
}
