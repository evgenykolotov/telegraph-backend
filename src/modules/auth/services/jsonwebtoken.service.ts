import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInfoDTO } from 'src/modules/users/dto/user-info.dto';

/**
 * @class
 * @name JSONWebTokenService
 * @classdesc Сервис для работы с jsonwebtoken в приложении.
 */
@Injectable()
export class JSONWebTokenService {
  /**
   * @constructor
   * @param {JwtService} jwtService - Сервис, поставляемый JWT модулем.
   */
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Создание Access токена с данными о пользователе.
   * @public
   * @param {UserInfoDTO} payload - Информация о пользователе, которая ляжет в токен.
   * @returns {string} - Строка с access токеном.
   */
  public createAccessToken(payload: UserInfoDTO): string {
    return this.jwtService.sign(
      { ...payload },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }

  /**
   * Создание Refresh токена с данными о пользователе.
   * @public
   * @param {UserInfoDTO} payload - Информация о пользователе, которая ляжет в токен.
   * @returns {string} - Строка с refresh токеном.
   */
  public createRefreshToken(payload: UserInfoDTO): string {
    return this.jwtService.sign(
      { ...payload },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '30d' },
    );
  }

  /**
   * Верификация Access токена.
   * @public
   * @param {string} token - access токен для верификации.
   * @returns {UserInfoDTO} - Информация о пользователе из токена.
   */
  public verifyAccessToken(token: string): UserInfoDTO {
    try {
      return this.jwtService.verify<UserInfoDTO>(token, {
        secret: process.env.JWT_ACCESS_KEY,
      });
    } catch (error) {
      throw new BadRequestException('Access токен не валидный');
    }
  }

  /**
   * Верификация Refresh токена.
   * @public
   * @param {string} token - refresh токен для верификации.
   * @returns {UserInfoDTO} - Информация о пользователе из токена.
   */
  public verifyRefreshToken(token: string): UserInfoDTO {
    try {
      return this.jwtService.verify<UserInfoDTO>(token, {
        secret: process.env.JWT_REFRESH_KEY,
      });
    } catch (error) {
      throw new BadRequestException('Refresh токен не валидный');
    }
  }
}
