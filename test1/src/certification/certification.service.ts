import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { certification } from './entities/certification.entity';

@Injectable()
export class CertificationService {
    constructor(@InjectRepository(certification) private certificationRepository: Repository<certification>,){
        
    }

    async getCertification(): Promise<certification[]> {
        return await this.certificationRepository.find();
      }
}
