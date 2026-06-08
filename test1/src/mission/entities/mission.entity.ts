import { produit } from './../../produit/entities/produit.entity';
import { fournisseur } from './../../fournisseur/entities/fournisseur.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { Commande } from 'src/commande/entities/commande.entity';

@Entity()
export class mission extends BaseEntity{

  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  client: string;

  @Column()
  type: string;
  
  @Column()
  fournisseur: string;

  @Column()
  description: string;

  @Column()
  datedebut: Date;

  @Column()
  datefin: Date;

  @Column()
  produit: string;


  @OneToMany(type => produit, (produit) => produit.mission,
    {
      nullable: true,
      cascade: true
    }
  )
  produits : produit;

  @Column()
  statut: string;
}
