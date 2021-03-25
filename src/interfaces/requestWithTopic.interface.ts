import { Request } from 'express';
import ITopic from '../interfaces/ITopic';

interface RequestWithTopic extends Request
{
    topic : ITopic;
}

export default RequestWithTopic;
