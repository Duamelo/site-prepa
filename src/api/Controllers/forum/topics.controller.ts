import authMiddleware from '../../middlewares/auth.middleware';
import * as express from 'express';
import RequestWithUser from 'interfaces/requestWithUser.interface';
import { getRepository } from 'typeorm';
import TopicNotFoundException from '../../exceptions/TopicNotFoundException';
//import Controller from '../../../interfaces/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import CreateTopicDto from '../../models/dto/topic.dto';
import Topic from '../../models/topic.entity';

class TopicsController {
    public path = '/topic';
    public router = express.Router();
    private topicRepository = getRepository(Topic);


    constructor(){
        this.initializeRoutes();
    }


    private initializeRoutes(){
       
        //this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
        this.router.get(this.path, this.getAllTopics);
        this.router.get(`${this.path}/:id`, this.getTopicById);
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id`, validationMiddleware(CreateTopicDto, true), this.modifyTopic)
            .delete(`${this.path}/:id`, this.deleteTopic)
            .post(this.path, authMiddleware, validationMiddleware(CreateTopicDto), this.createTopic);

    }


    private createTopic = async (request: RequestWithUser, response: express.Response) => {
        const TopicData: CreateTopicDto = request.body;
        const newTopic = this.topicRepository.create({
            ...TopicData,
           // auteur: request.user,
        });
        //const savedPost = await getRepository(newPost).save();

        //await this.postRepository.save(newPost);
        response.send(newTopic);
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
        const topicData: Topic = request.body;
        await this.topicRepository.update(id, topicData);
        const updateTopic = await this.topicRepository.findOne(id);
        if(updateTopic)
        {
            response.send(updateTopic);
        }
        else 
        {
            next(new TopicNotFoundException(id));
        }
    }

    private deleteTopic = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const deleteResponse = await this.topicRepository.delete(id);
        if(deleteResponse.raw[1])
        {
            response.send(200);
        }
        else
        {
            next(new TopicNotFoundException(id));

        }
    }
  
}

export default TopicsController;