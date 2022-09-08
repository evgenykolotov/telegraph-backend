import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EXCEPTION_MESSAGES } from 'src/types/exception-messages.enum';
import { JSONWebTokenService } from '../services/jsonwebtoken.service';
import { RequestWithUser } from 'src/types/application.types';

type CanActivateReturn = boolean | Promise<boolean> | Observable<boolean>;

/**
 * @class
 * @name AuthorizationGuard
 * @implements {CanActivate}
 * @classdesc Сервис для авторизации доступа к маршрутам.
 */
@Injectable()
export default class JwtAuthenticationGuard implements CanActivate {
  /**
   * @constructor
   * @param {JSONWebTokenService} jsonwebtokenservice - Сервис для работы с jsonwebtoken в приложении.
   */
  constructor(private readonly jsonwebtokenservice: JSONWebTokenService) {}

  /**
   * Метод реализующий интерфейс CanActivate.
   * @param {ExecutionContext} context - Контекст запроса.
   * @returns {CanActivateReturn}
   */
  public canActivate(context: ExecutionContext): CanActivateReturn {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  /**
   * Метод верификации запроса пользователя.
   * @param {Request} request - Запрос к API.
   * @throws {UnauthorizedException} - Пользователь не авторизован.
   * @returns {CanActivateReturn}
   */
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
