import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import CreateUserDto from '../models/dto/user.dto';
import User from '../models/user.entity';
import LogInDto from '../models/dto/logIn.dto';
import { getRepository } from 'typeorm';
import  TokenData  from '../../interfaces/TokenData.interface';
import  IUser  from '../../interfaces/IUser';
import  DataStoredInToken  from '../../interfaces/DataStoredInToken.interface';
import AuthenticationService from '../services/authentication.service';
// import CreateRegisterDto from '../models/dto/register.dto';

class AuthenticationController implements Controller 
{
    public authenticationService = new AuthenticationService();
    public path = '/auth';
    public router = express.Router();
    public userRepository = getRepository(User);


    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        this.router.post( `${this.path}/register/:role`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }


    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        try{
            const {
                cookie,
                user
            } = await this.authenticationService.registerUser(userData, request.params.role);
            response.setHeader('Set-Cookie', [cookie]);
            response.send(user);

        }catch(error)
        {
            next(error);
        }

    }
    
    
    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        const user = await this.userRepository.findOne({ email: logInData.email });
        if (user)
        {
            const isPasswordMatching = await bcrypt.compare(logInData.mot_de_passe, user.mot_de_passe);
            if (isPasswordMatching)
            {
                user.mot_de_passe = undefined;
                const tokenData = this.createToken(user);
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                response.status(200).send(`${user.nom} ${user.prenom}   is logged`);
            }
            else
            {
                next(new WrongCredentialsException());
            }
        }
        else
        next(new WrongCredentialsException());
    }


    private loggingOut = (request: express.Request, response: express.Response) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);
    }

    public createCookie(tokenData: TokenData)
    {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }
        

    public createToken(user: User): TokenData
    {
        const expiresIn = 60 * 60 * 60;
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _id: user.id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }


}


export default AuthenticationController;