// src/conge/entities/conge.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { IsNotEmpty, IsNumber, IsDateString,IsString, IsIn } from 'class-validator';

@Entity()
export class Conge {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    requester: User;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @Column()
    status: string; // You can define statuses like 'pending', 'approved', 'rejected', etc.
}

export class CreateCongeDto {
    @IsNotEmpty()
    userId;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsNotEmpty()
    endDate: Date;
}

export class UpdateCongeDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['approved', 'rejected', 'pending']) // Define the allowed status values
    status: string;
}