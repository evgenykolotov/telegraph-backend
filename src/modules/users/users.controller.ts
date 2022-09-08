import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/types/application.types';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import { UserInfoDTO } from './dto/user-info.dto';
import { UsersService } from './services/users.service';

/**
 * @class
 * @name UsersController
 * @classdesc Обработчик маршрутов для пользователя.
 */
@ApiTags('Пользователь')
@Controller('/api/user')
export class UsersController {
  /**
   * @contructor
   * @param {UsersService} usersService - Сервис для работы с пользователями.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Получение информации о пользовате.
   * @public
   * @param {Request} request - Объект запроса.
   * @returns {UserInfoDTO} - Информация пользователе.
   */
  @ApiOperation({ summary: 'Получение информации о пользователе' })
  @ApiOkResponse({ type: UserInfoDTO, description: 'Даныые успешно получены' })
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  public async getUserInfo(
    @Req() request: RequestWithUser,
  ): Promise<UserInfoDTO> {
    const user = await this.usersService.findUniqueById(request.user.id);

    return new UserInfoDTO(user);
  }
}
