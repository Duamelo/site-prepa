import { Request } from 'express';
import IComment from '../interfaces//IComment';


interface RequestWithComment extends Request 
{
    comment: IComment;
}

export default RequestWithComment;