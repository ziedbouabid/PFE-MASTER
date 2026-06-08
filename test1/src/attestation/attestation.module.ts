import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttestationService } from './attestation.service';
import { AttestationController } from './attestation.controller';
import { Attestation } from './entities/attestation.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Attestation]),TypeOrmModule.forFeature([User])],
    providers: [AttestationService],
    controllers: [AttestationController],
    exports: [AttestationService]
})
export class AttestationModule {}
