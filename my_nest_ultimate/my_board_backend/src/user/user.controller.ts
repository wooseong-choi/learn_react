import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService ){}

    @Post('/login')
    login(@Body() user:User){
        return this.userService.findOne(user.id);
    }
    
    @Post('/create')
    async create(@Body() user:User){
        return this.userService.create(user);
    }
}
