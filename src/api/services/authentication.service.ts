import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../../interfaces/DataStoredInToken.interface';
import TokenData from '../../interfaces/TokenData.interface';
import CreateUserDto from '../models/dto/user.dto';
import IUser from '../../interfaces/IUser';
import { getRepository } from 'typeorm';
import User from '../models/user.entity';
import { getManager } from 'typeorm';
// import CreateRegisterDto from '../models/dto/register.dto';


class AuthenticationService
{

    public userRepository =  getRepository(User);
    public userManager = getManager();
    public async registerUser(userData : CreateUserDto, role)
    {
        if (
            await this.userRepository.findOne({email: userData.email})
        ){
            throw  new UserWithThatEmailAlreadyExistsException(userData.email);
        }
        else {
            const hashedPassword = await bcrypt.hash(userData.mot_de_passe, 10);
            const user = await this.userRepository.create({
                ...userData,
                mot_de_passe: hashedPassword,
                role : {
                    id : role
                }
            });
            //await this.userRepository.save(user);
            await this.userManager.save(user);
            // user.mot_de_passe = undefined;
            const tokenData = this.createToken(user);
            const cookie = this.createCookie(tokenData);

            return {
                cookie,
                user
            };
        
        }
        
    }


    public createCookie(tokenData: TokenData)
    {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }
        

    public createToken(user: User): TokenData
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
export default AuthenticationService;