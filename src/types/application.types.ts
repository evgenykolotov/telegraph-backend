import { User } from '@prisma/client';
import { Request } from 'express';

export interface TokenPayload {
  userId: User['id'];
}

export interface RequestWithUser extends Request {
  user: User;
}
