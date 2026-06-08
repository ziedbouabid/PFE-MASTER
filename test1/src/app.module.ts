import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { MissionModule } from './mission/mission.module';
import { ProduitModule } from './produit/produit.module';
import { User } from './users/entities/user.entity';
import { mission } from './mission/entities/mission.entity';
import { fournisseur } from './fournisseur/entities/fournisseur.entity';
import { produit } from './produit/entities/produit.entity';
import { CompetencesModule } from './competences/competences.module';
import { CertificationModule } from './certification/certification.module';
import { certification } from './certification/entities/certification.entity';
import { competences } from './competences/entities/competences.entity';
import { CommandeModule } from './commande/commande.module';
import { FactureModule } from './facture/facture.module';
import { MessageModule } from './message/message.module';
import { CongeModule } from './conge/conge.module';
import { AttestationModule } from './attestation/attestation.module';
import { Commande } from './commande/entities/commande.entity';
import { Facture } from './facture/entities/facture.entity';
import { Conge } from './conge/entities/conge.entity';
import { Message } from './message/entities/message.entity';
import { Attestation } from './attestation/entities/attestation.entity';
import { DataSource } from 'typeorm';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER || 'zied',
      password: process.env.DB_PASSWORD || 'azertyS20645307',
      database: process.env.DB_NAME || 'my_nestjs_project',
      entities: [User,mission,fournisseur,produit,certification,competences,Commande,Facture,Conge,Message,Attestation],
      synchronize: false,
      dropSchema: false,
      autoLoadEntities: false ,
    }),
    UsersModule,
    AuthModule,
    FournisseurModule,
    MissionModule,
    ProduitModule,
    CompetencesModule,
    CertificationModule,
    CommandeModule,
    FactureModule,
    MessageModule,
    CongeModule,
    AttestationModule,
    SeedModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
