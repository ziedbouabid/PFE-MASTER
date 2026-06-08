// src/conge/conge.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongeService } from './conge.service';
import { CongeController } from './conge.controller';
import { Conge } from './entities/conge.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Conge]),TypeOrmModule.forFeature([User])],
    providers: [CongeService],
    controllers: [CongeController],
    exports: [CongeService]
})
export class CongeModule {}
