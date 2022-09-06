import { ApiProperty } from '@nestjs/swagger';
import { UserInfoDTO } from 'src/modules/users/dto/user-info.dto';

/**
 * @class
 * @name AuthDataDTO
 * @classdesc DTO с данными об авторизации.
 * @property {UserInfoDTO} user - Полезная информация о пользователе.
 * @property {string} access_token - Access токен.
 * @property {string} refresh_token -Refresh токен.
 */
export class AuthDataDTO {
  @ApiProperty({ type: UserInfoDTO, description: 'Информация о пользователе' })
  public readonly user: UserInfoDTO;

  @ApiProperty({ example: '', description: 'Access токен' })
  public readonly access_token: string;

  @ApiProperty({ example: '', description: 'Refresh токен' })
  public readonly refresh_token: string;
}
