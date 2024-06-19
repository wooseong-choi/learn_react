import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BbsService } from './bbs.service';
import { Bbs } from './entity/bbs.entity';
import { Comment } from './entity/comment.entity';

@Controller('bbs')
export class BbsController {
    constructor( private readonly bbsService: BbsService ){}

    @Get("/")
    getList(){
        return this.bbsService.getAllBbs();
    }

    @Get("/detail/:id")
    getDetail(@Param('id') bbsId:number){
        return this.bbsService.getOneBbs(bbsId);
    }

    @Post("/write")
    create(@Body() bbs:Bbs){
        return this.bbsService.createBbs(bbs);
    }

    @Post("/write/:id")
    update(@Body() bbs:Bbs){
        return this.bbsService.updateBbs(bbs.bbs_id,bbs);
    }

    @Post("/delete/:id")
    delete(@Param('id') id : number){
        return this.bbsService.deleteBbs(id);
    }
    
    @Post("/comment")
    createComment(@Body() comment:Comment){
        console.log('들옴?');
        return this.bbsService.createComment(comment);
    }

    @Get("/comment/:id")
    getCommentList(@Param('id') id: number){
        return this.bbsService.getAllCommentsByBbsId(id);
    }


    @Post("/comment/:id")
    updateComment(@Param('id') id:number, @Body() comment:Comment){
        return this.bbsService.updateComment(id,comment);
    }

    @Post("/comment/delete/:id")
    deleteComment(@Param('id') id:number){
        this.bbsService.deleteComment(id);
    }


}
