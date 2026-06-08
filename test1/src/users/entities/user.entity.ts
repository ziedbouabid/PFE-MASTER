import { OneToMany, Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { mission } from 'src/mission/entities/mission.entity';
import { fournisseur } from 'src/fournisseur/entities/fournisseur.entity';
import { Message } from 'src/message/entities/message.entity';
import { Attestation } from 'src/attestation/entities/attestation.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  role: string;

  @Column()
  statut: string;

  @Column()
  poste: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  tele: string;

  @Column()
  secondeRole: string

  @OneToMany(
    type => mission,
    (mission) => mission,
    {
      nullable: true,
      cascade: true
    }
  )
  missions: mission[];

  @OneToMany(
    type => fournisseur,
    (fournisseur) => fournisseur,
    {
      nullable: true,
      cascade: true
    }
  )
  fournisseur: fournisseur[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Attestation, attestation => attestation.recipient)
    attestations: Attestation[];

}
