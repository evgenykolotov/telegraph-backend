import { User } from '@prisma/client';
import { Request } from 'express';
import { UserInfoDTO } from 'src/modules/users/dto/user-info.dto';

export interface TokenPayload {
  userId: User['id'];
}

export interface RequestWithUser extends Request {
  user?: UserInfoDTO;
}
