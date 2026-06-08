// src/facture/entities/facture.entity.ts

import { Commande } from 'src/commande/entities/commande.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Facture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @OneToOne(() => Commande, (commande) => commande.facture)
    @JoinColumn()
    commande: Commande;
}
