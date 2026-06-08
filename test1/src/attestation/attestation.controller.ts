// src/attestation/attestation.controller.ts

import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { AttestationService } from './attestation.service';
import { Attestation } from './entities/attestation.entity';

@Controller('attestations')
export class AttestationController {
    constructor(private readonly attestationService: AttestationService) {}

    @Post(':userId')
    async createAttestation(
        @Param('userId') userId: number,
        @Body() createAttestationDto: { certificateType: string, issueDate: Date },
    ): Promise<Attestation> {
        const { certificateType, issueDate } = createAttestationDto;
        return await this.attestationService.createAttestation(userId, {certificateType, issueDate});
    }

    @Get(':userId')
    async listAttestations(@Param('userId') userId: number): Promise<Attestation[]> {
        return await this.attestationService.listAttestations(userId);
    }
}
