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

class AuthenticationController implements Controller 
{

    public path = '/auth';
    public router = express.Router();
    public userRepository = getRepository(User);


    constructor()
    {
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        this.router.post( `${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }


    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        if (
            await this.userRepository.findOne({email: userData.email})
        ){
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        }
        else {
            const hashedPassword = await bcrypt.hash(userData.mot_de_passe, 10);
            const user = await this.userRepository.create({
                ...userData,
                mot_de_passe: hashedPassword,
            });
            user.mot_de_passe = undefined;
            const tokenData = this.createToken(user);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response.send(user);

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
                response.send(user);
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

    private  createCookie(tokenData: TokenData)
    {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }
        

    private createToken(user: IUser): TokenData
    {
        const expiresIn = 60 * 60;
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