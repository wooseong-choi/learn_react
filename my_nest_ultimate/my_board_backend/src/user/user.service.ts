import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}
    
    async findOne(id:string): Promise<User>{
        return this.usersRepository.findOne({ where : {id:id}});
    }

    async create(User:User): Promise<User>{
        const user = await this.findOne(User.id);
        if(user !== null )
            throw new ConflictException("this ID already been created");
        await this.usersRepository.save(User);
        return await this.findOne(User.id);
    }

}
