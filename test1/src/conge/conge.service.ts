import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // Import User entity if not already imported
import { Conge, CreateCongeDto, UpdateCongeDto } from './entities/conge.entity';

@Injectable()
export class CongeService {
    constructor(
        @InjectRepository(Conge)
        private readonly congeRepository: Repository<Conge>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<Conge[]> {
        return await this.congeRepository.find();
    }

    async findOne(id): Promise<Conge> {
        const conge = await this.congeRepository.findOne(id);

        if (!conge) {
            throw new NotFoundException(`Leave request with ID ${id} not found`);
        }

        return conge;
    }

    async create(createCongeDto: CreateCongeDto): Promise<Conge> {
        const { userId, startDate, endDate } = createCongeDto;

        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const conge = this.congeRepository.create({ requester: user, startDate, endDate, status: 'pending' });
        return await this.congeRepository.save(conge);
    }

    async update(id: number, updateCongeDto: UpdateCongeDto): Promise<Conge> {
        const conge = await this.findOne(id);

        const { status } = updateCongeDto;

        conge.status = status;

        return await this.congeRepository.save(conge);
    }

    async remove(id: number): Promise<void> {
        const conge = await this.findOne(id);
        await this.congeRepository.remove(conge);
    }
}
