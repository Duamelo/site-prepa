import UserNotFoundException from '../exceptions/UserNotFoundException';
import authMiddleware from '../middlewares/auth.middleware';
import CreateRoleDto from '../models/dto/role.dto';
import Role from '../models/role.entity';
import User from '../models/user.entity';
import * as express from 'express';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import { getManager, getRepository } from 'typeorm';

class RoleController{
    public path = '/role';
    public router = express.Router();
    private roleRepository = getRepository(Role);
    private userRepository  = getRepository(User);
    private roleManager = getManager();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/:id`, this.getUserRole);
        this.router.post(`${this.path}`, this.createRole);
        this.router.patch(`${this.path}`, this.updateRole)
    }

    private updateRole = async (request : RequestWithUser, response : express.Response, next : express.NextFunction) =>{
        // Cela revient a modifier un User 
    }

    private  getUserRole = async (request : RequestWithUser, response : express.Response, next : express.NextFunction) =>{
        
        //on va tester qu'il s'agit de l'admin
        

        
        //fin du test
        
        const id = request.params.id;

        const user = await this.userRepository.findOne(id);

        console.log(user);

        const roleUser = user.role;

        

        if(roleUser){
            response.send(roleUser);
        }else{
            next(new UserNotFoundException(id));
        }
    }

    private createRole = async (request : RequestWithUser, response : express.Response, next : express.NextFunction)=>{
        //on va tester qu'il s'agit de l'admin
        

        
        //fin du test
        const RoleData: CreateRoleDto = request.body;
        const newRole = await this.roleRepository.create({
            ...RoleData
        });
        const saveRole = await this.roleManager.save(newRole);
        response.send(saveRole);
    }
}

export default RoleController;