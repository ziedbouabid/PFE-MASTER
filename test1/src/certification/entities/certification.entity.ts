import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { fournisseur } from 'src/fournisseur/entities/fournisseur.entity';
@Entity()
export class certification extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @ManyToOne(()=> fournisseur,(fournisseur) => fournisseur.certifications)
  fournisseur : fournisseur;
  
}