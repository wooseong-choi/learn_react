import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bbs } from './entity/bbs.entity';
import { Comment } from './entity/comment.entity';
import { BbsService } from './bbs.service';
import { BbsController } from './bbs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Bbs,Comment])],
    providers:[BbsService],
    controllers:[BbsController],
})
export class BbsModule {}
