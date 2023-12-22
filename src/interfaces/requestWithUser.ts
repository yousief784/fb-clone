import { UserInterface } from './user.interface';
import { Request } from 'express';

interface RequestWithUser extends Request {
    user?: { _id: string };
}

export default RequestWithUser;
