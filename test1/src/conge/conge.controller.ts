// src/conge/conge.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CongeService } from './conge.service';
import { Conge, CreateCongeDto, UpdateCongeDto } from './entities/conge.entity';

@Controller('conge')
export class CongeController {
    constructor(private readonly congeService: CongeService) {}

    @Get()
    findAll(): Promise<Conge[]> {
        return this.congeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Conge> {
        return this.congeService.findOne(id);
    }

    @Post()
    create(@Body() createCongeDto: CreateCongeDto): Promise<Conge> {
        return this.congeService.create(createCongeDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCongeDto: UpdateCongeDto): Promise<Conge> {
        return this.congeService.update(id, updateCongeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.congeService.remove(id);
    }
}
