import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateAttestationDto {
    @IsString()
    @IsNotEmpty()
    certificateType: string;

    @IsDateString()
    @IsNotEmpty()
    issueDate: Date;
}

@Entity()
export class Attestation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    certificateType: string;

    @Column({ type: 'date' })
    issueDate: Date;

    @ManyToOne(() => User, user => user.attestations)
    recipient: User;
}