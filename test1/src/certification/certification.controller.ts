import { Controller, Get } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { certification } from './entities/certification.entity';

@Controller('certification')
export class CertificationController {
    constructor(private certificationService: CertificationService){

    }

@Get('getCertification')
    async getCertification(): Promise<certification[]> {
        return await this.certificationService.getCertification();
      }






}
