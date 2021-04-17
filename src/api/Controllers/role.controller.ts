import UserNotFoundException from '../exceptions/UserNotFoundException';
import authMiddleware from '../middlewares/auth.middleware';
import CreateRoleDto from '../models/dto/role.dto';
import Role from '../models/role.entity';
import User from '../models/user.entity';
import * as express from 'express';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import { getManager, getRepository } from 'typeorm';
import RoleNotFoundException from '../exceptions/RoleNotFoundException'

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
        this.router.post(`${this.path}`, this.createRole);
        this.router.patch(`${this.path}/:id`, this.updateRole);
        this.router.delete(`${this.path}/:id`, this.deleteRole);
    }

    private deleteRole = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;

        try{
            const deleteResponse = await this.roleRepository.delete(id);
            response.status(200).send(`Role with id ${id} deleted`);
        }catch(e){
            next(new RoleNotFoundException(id));
        }

    }

    private updateRole = async (request : RequestWithUser, response : express.Response, next : express.NextFunction) =>{
        const id = request.params.id;
        const roleData : CreateRoleDto = request.body;
        await this.roleRepository.update(id, roleData);
        const role = await this.roleRepository.findOne(id);

        if (role) {
            response.json(role)
        }else{
            next(new RoleNotFoundException(id))
        }
    }


    private createRole = async (request : RequestWithUser, response : express.Response, next : express.NextFunction)=>{
        try{
            const RoleData: CreateRoleDto = request.body;
            const newRole = await this.roleRepository.create({
                ...RoleData
            });
            const saveRole = await this.roleManager.save(newRole);
            response.send(saveRole);
        } catch(err){
            response.json(err);
        }
    }
}

export default RoleController;