import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne } from 'typeorm';
import { mission } from 'src/mission/entities/mission.entity';
import { Facture } from 'src/facture/entities/facture.entity';
@Entity()
export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  missionId: number;

  @OneToOne(() => Facture, (facture) => facture.commande, {
    nullable: true,
    cascade: true,
  })
  facture: Facture;
}
