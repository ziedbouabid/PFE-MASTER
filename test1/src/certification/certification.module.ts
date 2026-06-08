import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationController } from './certification.controller';
import { CertificationService } from './certification.service';
import { certification } from './entities/certification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([certification])],
  controllers: [CertificationController],
  providers: [CertificationService]
})
export class CertificationModule {}
