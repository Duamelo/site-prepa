import { Request } from 'express';
import IUser from './IUser';
import ITopic from './ITopic';


interface RequestWithUserAndTopic extends Request
{
    user: IUser;
    topic: ITopic;
}

export default RequestWithUserAndTopic;