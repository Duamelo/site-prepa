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
import RequestWithUserAndTopic from 'interfaces/requestWithUserAndTopic.interface';


class CommentsController
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
        this.router.get(this.path , this.getAllComments);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .post(this.path, authMiddleware, validationMiddleware(CreateCommentDto), this.createComment)
            .delete(`${this.path}/:id`, this.deleteCommentById)
            .patch(`${this.path}/:id`, validationMiddleware(CreateCommentDto, true), this.modifyComments);

    }




    private getAllComments = async (request: express.Request, response: express.Response, next: express.NextFunction ) => {

        const comments = await this.commentRepository.find({ relations : ["comments"]});

        response.send(comments);    
   
    
    }




    private createComment = async (request: RequestWithUserAndTopic, response: express.Response) => {

        // const CommentData: CreateCommentDto = request.body;
        // const newComment = this.commentRepository.create({
        //     ...CommentData,
        // });

        // await this.commentRepository.save(newComment);
        // response.send(newComment);

    }


    private deleteCommentById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    }


    private modifyComments = async ( request: express.Request, response: express.Response, next: express.NextFunction) => {

    }



}

export default CommentsController;