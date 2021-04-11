import * as express from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user.entity';
// import  IUser  from '../../interfaces/IUser';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import CreateUserDto from '../models/dto/user.dto';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
// import { Certificate } from 'node:crypto';

class UsersController {
    public path = '/users'
    public router =express.Router();
    private usersRepository = getRepository(User);

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path, this.getAllUsers);
        this.router.get(`${this.path}/:id`, this.getUsersById);
        this.router
            .all(`${this.path}/*`)
            .patch(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.modifyUsers)
            .delete(`${this.path}/:id`, this.deleteUser);
    }



    public getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await this.usersRepository.find(); // connais pas les parametres

        response.send(users);
    }

    public getUsersById = async (request: express.Request, response: express.Response, next : express.NextFunction) => {
        
        const id = request.params.id;
        
        const user = await this.usersRepository.findOne(id) // connait pas les parametres

        if(user){
            response.send(user);
        } else {
            next(new UserNotFoundException(id))
        }
    }
    public modifyUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const usersData: User = request.body;

        await this.usersRepository.update(id, usersData);

        const updateUsers = await this.usersRepository.findOne(id);
        if(updateUsers)
        {
            response.send(updateUsers);
        }
        else 
        {
            next(new UserNotFoundException(id));
        }
    }

    public deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;

        try{
            const deleteUser = await this.usersRepository.delete(`${id}`);
        
            response.status(200).send(`User with id ${id} deleted`);
        }catch(e){
            throw new UserNotFoundException(id);
        }
        
    }
}

export default UsersController;