import { produit } from './../../produit/entities/produit.entity';
import { mission } from './../../mission/entities/mission.entity';
import { ManyToMany, JoinTable, OneToMany, Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { certification } from 'src/certification/entities/certification.entity';
import { competences } from 'src/competences/entities/competences.entity';
import { PipelineDestinationPromiseFunction } from 'stream';
@Entity()
export class fournisseur extends BaseEntity{
 
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nom: string;

  @Column()
  description: string;

  @Column()
  tele: string;

  @Column({ unique: true })
  email: string;
  
  @OneToMany(type => certification,(certification) => certification.fournisseur,
    {
      nullable: true,
      cascade: true
    }
  )
  certifications: certification[];



  @OneToMany(type => competences, (competences) => competences.fournisseur,
    {
      nullable: true,
      cascade: true
    }
  )
  competences: competences[];

  }
