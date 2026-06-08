import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  findOne(username: string) {
    throw new Error('Method not implemented.');
  }
  update(_id: string, arg1: { password: void; }) {
    throw new Error('Method not implemented.');
  }
  hashPassword(password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }
  async getUsers(user: User): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findOneByEmail(email): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async createUser(user: User): Promise<User> {

    //return this.usersRepository.create(user);
    console.log(user.id);
    return this.usersRepository.save(user);
  }
  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'email', 'password'],
      where: [{ id: _id }],
    });
  }
  transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // true pour le port 465, false pour les autres ports
    auth: {
      user: 'zied@gmail.com',
      pass: 'aaaaaa',
    },

  });


  async updateUser(user: User) {
    const fields: any = {}
    if (user.statut) fields.statut = user.statut
    if (user.prenom) fields.prenom = user.prenom
    if (user.tele) fields.tele = user.tele
    if (user.role) fields.role = user.role
    await this.usersRepository.update(user.id, fields);
  }

  async getChplns(): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        secondeRole: Not(''),
      },
    });
  }

  async getEmployes(): Promise<User[]> {
    const rolesToFind = ['EMP', 'Planning','CHPLA',"CHCM",'CHRH'];

    return await this.usersRepository.find({
      where: { role: In(rolesToFind) }
    });
  }

}
