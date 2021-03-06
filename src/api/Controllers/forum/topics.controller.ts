import authMiddleware from '../../middlewares/auth.middleware';
import * as express from 'express'; 
import RequestWithUser from 'interfaces/requestWithUser.interface';
import { getRepository } from 'typeorm';
import TopicNotFoundException from '../../exceptions/TopicNotFoundException';
//import Controller from '../../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import CreateTopicDto from '../../models/dto/topic.dto';
import Topic from '../../models/topic.entity';
import Comment from '../../models/comment.entity';
import {getManager} from 'typeorm';

class TopicsController 
{
    public path = '/topic';
    public router = express.Router();
    private topicRepository = getRepository(Topic);
    private topicManager = getManager();
     
    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
       
        //this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
        this.router.get(this.path, this.getAllTopics);
        this.router.get(`${this.path}/:id`, this.getTopicById);
        this.router.get(`${this.path}/comment:id`, this.getAllCommentByTopicId)
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateTopicDto, true), this.modifyTopic)
            .delete(`${this.path}/:id`, this.deleteTopic)
            .post(`${this.path}/:idCategory`,authMiddleware, validationMiddleware(CreateTopicDto), this.createTopic);

    }


    private getAllCommentByTopicId = async (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const comments = await this.topicRepository.find({ relations: ["comments"]});

        response.send(comments);  
    }
    
    private createTopic = async (request: RequestWithUser, response: express.Response) => {
        const id = parseInt(request.params.idCategory);
        
        const TopicData: CreateTopicDto = request.body;
        const newTopic = this.topicRepository.create({
            ...TopicData,
            user: request.user,
            categories : {
                id
            }
        });
        const savedTopic = await this.topicManager.save(newTopic);
        response.send(savedTopic);
    }

    private getAllTopics = async (request: express.Request, response: express.Response) => {
        const topics = await this.topicRepository.find({ relations: ['categories'] });
        

        response.send(topics);
    }

    private getTopicById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const topic = await this.topicRepository.findOne(id, { relations: ['categories']});
        if(topic)
        {
            response.send(topic);
        }
        else 
        {

            next(new TopicNotFoundException(id));
        }
    }


    private modifyTopic = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const topicData: CreateTopicDto = request.body;
        
        const updateTopic = await this.topicRepository.findOne(id);
        if(updateTopic)
        {
            await this.topicRepository.update(id, topicData);
            response.send(updateTopic);
        }
        else 
        {
            next(new TopicNotFoundException(id));
        }
    }

    private deleteTopic = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;

        try{
            const deleteResponse = await this.topicRepository.delete(id);
            response.status(200).send(`Topic with id ${id} deleted`);
        }catch(e){
            next(new TopicNotFoundException(id));
        }

    }
  
}

export default TopicsController;