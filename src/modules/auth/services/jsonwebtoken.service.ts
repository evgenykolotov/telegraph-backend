import { JwtService } from '@nestjs/jwt';
import { EXPIRES_IN } from 'src/types/application.types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInfoDTO } from 'src/modules/users/dto/user-info.dto';
import { EXCEPTION_MESSAGES } from 'src/types/exception-messages.enum';

@Injectable()
export class JSONWebTokenService {
  constructor(private readonly jwtService: JwtService) {}

  public createAccessToken(payload: UserInfoDTO): string {
    return this.jwtService.sign(
      { ...payload },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: EXPIRES_IN.ONE_HOUR },
    );
  }

  public createRefreshToken(payload: UserInfoDTO): string {
    return this.jwtService.sign(
      { ...payload },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: EXPIRES_IN.THIRTY_DAY },
    );
  }

  public verifyAccessToken(token: string): UserInfoDTO {
    return this.verifyToken(token, process.env.JWT_ACCESS_KEY);
  }

  public verifyRefreshToken(token: string): UserInfoDTO {
    return this.verifyToken(token, process.env.JWT_REFRESH_KEY);
  }

  private verifyToken(token: string, secret: string): UserInfoDTO {
    try {
      return this.jwtService.verify<UserInfoDTO>(token, { secret });
    } catch (error) {
      throw new BadRequestException(EXCEPTION_MESSAGES.TOKEN_INVALID);
    }
  }
}
