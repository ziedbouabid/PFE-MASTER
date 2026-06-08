import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post(':userId')
    async createMessage(
        @Param('userId') userId: number,
        @Body() createMessageDto: { content: string },
    ): Promise<Message> {
        const { content } = createMessageDto;
        return await this.messageService.createMessage(userId, content);
    }

    @Get(':userId')
    async getAllMessagesByUserId(@Param('userId') userId: number): Promise<Message[]> {
        return await this.messageService.getAllMessagesByUserId(userId);
    }
}
