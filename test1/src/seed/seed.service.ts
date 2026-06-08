import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { competences } from 'src/competences/entities/competences.entity';
import { fournisseur } from 'src/fournisseur/entities/fournisseur.entity';
import { Repository } from 'typeorm';
import { Commande } from '../commande/entities/commande.entity';
import competenceData from './data/competence.data';
import fournisseurData from './data/fournisseur.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Commande) private readonly commandeRepository: Repository<Commande>,
    @InjectRepository(competences) private readonly competenceRepository: Repository<competences>,
    @InjectRepository(fournisseur) private readonly fournisseurRepository: Repository<fournisseur>,) { }

  async seedFournisseurTable() {
    const existingFournisseurs = await this.fournisseurRepository.find();

    // Check if the table is already seeded
    if (existingFournisseurs.length === 0) {

      // Insert the data into the table
      await this.fournisseurRepository.save(fournisseurData.map(item => this.fournisseurRepository.create(item)));

      console.log(`Fournisseur table seeded with ${fournisseurData.length} entries.`);
    } else {
      console.log('Fournisseur table already contains data. Skipping seeding.');
    }
  }
  async seedCompetencesTable() {
    const existingCompetences = await this.competenceRepository.find();

    // Check if the table is already seeded
    if (existingCompetences.length === 0) {
      const fournisseurs = await this.fournisseurRepository.find();
      console.log(fournisseurs[0]);
      
      let editedCompetenceData = competenceData.map((c, i) => {
        const randomIndex = Math.floor(Math.random() * fournisseurs.length); // Random index
        const fournisseur = fournisseurs[randomIndex];
        return ({ ...c, fournisseur: fournisseur })
      
      })
      // Define the data to be seeded
      // Insert the data into the table
      await this.competenceRepository.save(editedCompetenceData.map(item => this.competenceRepository.create(item)));

      console.log(`Competences table seeded with ${editedCompetenceData.length} entries.`);
    } else {
      console.log('Competences table already contains data. Skipping seeding.');
    }
  }
  async seedCommandeTable() {
    const existingCommandes = await this.commandeRepository.find();

    // Check if the table is already seeded
    if (existingCommandes.length === 0) {
      // Generate fake data and insert into the table
      const numFakeCommandes = 10

      for (let i = 0; i < numFakeCommandes; i++) {
        const commande = new Commande();
        commande.description = `Commande ${i + 1}`;
        await this.commandeRepository.save(commande);
      }

      console.log(`Commande table seeded with ${numFakeCommandes} fake entries.`);
    } else {
      console.log('Commande table already contains data. Skipping seeding.');
    }
  }
}
