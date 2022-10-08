import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithUser } from 'src/types/application.types';
import { EXCEPTION_MESSAGES } from 'src/types/exception-messages.enum';
import { JSONWebTokenService } from '../services/jsonwebtoken.service';

type CanActivateReturn = boolean | Promise<boolean> | Observable<boolean>;

@Injectable()
export default class JwtAuthenticationGuard implements CanActivate {
  constructor(private readonly jsonwebtokenservice: JSONWebTokenService) {}

  public canActivate(context: ExecutionContext): CanActivateReturn {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: RequestWithUser): CanActivateReturn {
    try {
      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader) throw new UnauthorizedException();

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) throw new UnauthorizedException();

      const userData = this.jsonwebtokenservice.verifyAccessToken(accessToken);
      if (!userData) throw new UnauthorizedException();

      request.user = userData;

      return true;
    } catch (error) {
      throw new UnauthorizedException(EXCEPTION_MESSAGES.UNAUTHORIZED);
    }
  }
}
