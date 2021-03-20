import { Request } from 'express';
import IUser from '../interfaces/IUser';


interface RequestWithUser extends Request 
{
    user: IUser;
}

export default RequestWithUser;