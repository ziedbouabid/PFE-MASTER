import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // Import User entity if not already imported
import { Attestation, CreateAttestationDto } from './entities/attestation.entity';

@Injectable()
export class AttestationService {
    constructor(
        @InjectRepository(Attestation)
        private readonly attestationRepository: Repository<Attestation>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createAttestation(userId, createAttestationDto: CreateAttestationDto): Promise<Attestation> {
        const { certificateType, issueDate } = createAttestationDto;

        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const attestation = this.attestationRepository.create({
            certificateType,
            issueDate,
            recipient: user,
        });

        return await this.attestationRepository.save(attestation);
    }

    async listAttestations(userId): Promise<Attestation[]> {
        const queryBuilder = this.attestationRepository
            .createQueryBuilder('attestation')
            .where('attestation.recipient.id = :userId', { userId });
    
        return await queryBuilder.getMany();
    }
}
