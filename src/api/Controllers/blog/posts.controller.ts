import authMiddleware from '../../middlewares/auth.middleware';
import * as express from 'express';
import RequestWithUser from 'interfaces/requestWithUser.interface';
import { getRepository } from 'typeorm';
import PostNotFoundException from '../../../api/exceptions/PostNotFoundException';
import Controller from '../../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import CreatePostDto from '../../models/dto/post.dto';
import Post from '../../models/post.entity';

class PostsController {
    public path = '/posts';
    public router = express.Router();
    private postRepository = getRepository(Post);


    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
       
        //this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
            .delete(`${this.path}/:id`, this.deletePost)
            .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);

    }


    private createPost = async (request: RequestWithUser, response: express.Response) => {
        const postData: CreatePostDto = request.body;
        const newPost = this.postRepository.create({
            ...postData,
           // auteur: request.user,
        });
        //const savedPost = await getRepository(newPost).save();

        //await this.postRepository.save(newPost);
        response.send(newPost);
    }

    private getAllPosts = async (request: express.Request, response: express.Response) => {
        const posts = await this.postRepository.find({ relations: ['categories'] });
        

        response.send(posts);
    }

    private getPostById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const post = await this.postRepository.findOne(id, { relations: ['categories']});
        if(post)
        {
            response.send(post);
        }
        else 
        {

            next(new PostNotFoundException(id));
        }
    }


    private modifyPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const postData: Post = request.body;
        await this.postRepository.update(id, postData);
        const updatePost = await this.postRepository.findOne(id);
        if(updatePost)
        {
            response.send(updatePost);
        }
        else 
        {
            next(new PostNotFoundException(id));
        }
    }

    private deletePost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const deleteResponse = await this.postRepository.delete(id);
        if(deleteResponse.raw[1])
        {
            response.send(200);
        }
        else
        {
            next(new PostNotFoundException(id));

        }
    }
  
}

export default PostsController;