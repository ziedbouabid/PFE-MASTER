import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mission } from 'src/mission/entities/mission.entity';
import { Repository } from 'typeorm';
import { Commande } from './entities/commande.entity'; // Ensure the import is correct and matches your entity name

@Injectable()
export class CommandeService {
    constructor(
        @InjectRepository(Commande) private readonly commandeRepository: Repository<Commande>,
        @InjectRepository(mission) private readonly missionRepository: Repository<mission>

    ) { }

    async create(commandeData: Partial<Commande>): Promise<Commande> {
        console.log("commande to be created :", commandeData)
        const commande = this.commandeRepository.create({ description: commandeData.description, missionId: commandeData.missionId });
        console.log("created commande :", commande)
        return await this.commandeRepository.save(commande);
    }

    async findAll(): Promise<Commande[]> {
        let commandes: any = await this.commandeRepository.find();
        commandes = await Promise.all(commandes.map(async cmd => {
            cmd.mission = await this.missionRepository.findOne({ where: { id: cmd.missionId } });
            console.log("cmd  :",cmd)
            return cmd
        }))
        return commandes
    }

    async findOne(id): Promise<Commande> {
        const commande = await this.commandeRepository.findOne(id);
        if (!commande) {
            throw new NotFoundException(`commande with ID ${id} not found`);
        }
        return commande;
    }
}
