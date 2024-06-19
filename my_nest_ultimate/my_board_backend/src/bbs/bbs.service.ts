import { Injectable, NotFoundException } from '@nestjs/common';
import { Bbs } from './entity/bbs.entity';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BbsService {
    constructor(
        @InjectRepository(Bbs)
        private bbsRepository: Repository<Bbs>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ){}
    
    // 전체 글 목록 조회
    async getAllBbs(): Promise<Bbs[]> {
        return await this.bbsRepository.find({ where: { use_yn: 'Y' } });
    }

    // 단일 글 목록 조회
    async getOneBbs(bbsId: number): Promise<Bbs> {
        return await this.bbsRepository.findOne({ where: { bbs_id:bbsId ,use_yn: 'Y' } });
    }

    // 글 등록
    async createBbs(bbs: Bbs): Promise<Bbs> {
        return await this.bbsRepository.save(bbs);
    }

    // 글 수정
    async updateBbs(bbsId: number, updatedBbs: Bbs): Promise<Bbs> {
        const bbs = await this.bbsRepository.findOne({ where :{ bbs_id:bbsId }});
        if (!bbs) {
            throw new NotFoundException(`Bbs with ID ${bbsId} not found`);
        }

        // Update only provided fields
        bbs.title = updatedBbs.title;
        bbs.content = updatedBbs.content;
        return await this.bbsRepository.save(bbs);
    }

    // 글 삭제 (use_yn 값을 'N'으로 업데이트)
    async deleteBbs(bbsId: number): Promise<void> {
        const bbs = await this.bbsRepository.findOne({ where :{ bbs_id:bbsId }});
        if (!bbs) {
            throw new NotFoundException(`Bbs with ID ${bbsId} not found`);
        }

        bbs.use_yn = 'N';
        await this.bbsRepository.save(bbs);
    }

    ////// 여기서부터 댓글

    // 특정 글에 대한 전체 댓글 목록 조회
    async getAllCommentsByBbsId(bbsId: number): Promise<Comment[]> {
        return await this.commentRepository.find({ where: { bbs_id: bbsId, use_yn: 'Y' } });
    }

    // 댓글 등록
    async createComment(comment: Comment): Promise<Comment> {
        return await this.commentRepository.save(comment);
    }

    // 댓글 수정
    async updateComment(commentId: number, updatedComment: Comment): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ where: { comment_id:commentId }});
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        // Update only provided fields
        comment.content = updatedComment.content;
        return await this.commentRepository.save(comment);
    }

    // 댓글 삭제 (use_yn 값을 'N'으로 업데이트)
    async deleteComment(commentId: number): Promise<void> {
        const comment = await this.commentRepository.findOne({ where: { comment_id:commentId }});
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`);
        }

        comment.use_yn = 'N';
        await this.commentRepository.save(comment);
    }


}
