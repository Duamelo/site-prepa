import authMiddleware from '../../middlewares/auth.middleware';
import * as express from 'express';
import RequestWithUser from 'interfaces/requestWithUser.interface';
import { getRepository } from 'typeorm';
import CommentNotFoundException from '../../exceptions/CommentNotFoundException';
import validationMiddleware from '../../middlewares/validation.middleware';
import CreateTopicDto from '../../models/topic.entity';
import CreateCommentDto from '../../models/comment.entity';
import CreateUserDto from '../../models/user.entity';
import Topic from '../../models/topic.entity';
import Comment from '../../models/user.entity';
import User from '../../models/user.entity';
import RequestWithTopic from '../../../interfaces/requestWithTopic.interface';
import RequestWithComment from 'interfaces/requestWithComment.interface';


class CommentController
{
    public path = '/comment';
    public router = express.Router();

    private commentRepository = getRepository(Comment);


    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        this.router.get(this.path, this.getAllCommentsByIdTopic);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .post(this.path, authMiddleware, validationMiddleware(CreateCommentDto), this.createComment);
    }




    private getAllCommentsByIdTopic = async (request: express.Request, response: express.Response, next: express.NextFunction ) => {
        const id = request.params.id;
        const comments = await this.commentRepository.query(`select * from comment where topicId = ${id}`);

        response.send(comments);    
   
    
    }




    private createComment = async (request: RequestWithComment, response: express.Response) => {

    }



}