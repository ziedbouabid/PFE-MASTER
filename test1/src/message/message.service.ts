import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createMessage(userId, content: string): Promise<Message> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const message = this.messageRepository.create({ content, user });
        return await this.messageRepository.save(message);
    }

    async getAllMessagesByUserId(userId: number): Promise<Message[]> {
        const messages = await this.messageRepository.find({ where: { user: { id: userId } } });

        if (!messages || messages.length === 0) {
            throw new NotFoundException(`No messages found for User with ID ${userId}`);
        }

        return messages;
    }
}
