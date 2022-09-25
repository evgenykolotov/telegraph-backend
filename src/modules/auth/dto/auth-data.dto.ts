import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import { UserInfoDTO } from 'src/modules/users/dto/user-info.dto';
import { JSONWebTokenService } from '../services/jsonwebtoken.service';

/**
 * @class
 * @name AuthDataDTO
 * @classdesc DTO с данными об авторизации.
 * @property {UserInfoDTO} user - Полезная информация о пользователе.
 * @property {string} access_token - Access токен.
 * @property {string} refresh_token -Refresh токен.
 */
export class AuthDataDTO {
  private static jwtService = new JSONWebTokenService(new JwtService());

  @ApiProperty({ type: UserInfoDTO, description: 'Информация о пользователе' })
  public readonly user: UserInfoDTO;

  @ApiProperty({ example: '', description: 'Access токен' })
  public readonly access_token: string;

  @ApiProperty({ example: '', description: 'Refresh токен' })
  public readonly refresh_token: string;

  constructor(user: User) {
    this.user = new UserInfoDTO(user);
    this.access_token = AuthDataDTO.jwtService.createAccessToken(this.user);
    this.refresh_token = AuthDataDTO.jwtService.createRefreshToken(this.user);
  }
}
