import { Request } from 'express';
import { User } from '@prisma/client';
import { UserInfoDTO } from 'src/modules/users/dto/user-info.dto';

export interface TokenPayload {
  userId: User['id'];
}

export interface RequestWithUser extends Request {
  user?: UserInfoDTO;
}

export const enum EXPIRES_IN {
  ONE_HOUR = '1h',
  THIRTY_DAY = '30d',
}
