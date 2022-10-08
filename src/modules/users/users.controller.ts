import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserInfoDTO } from './dto/user-info.dto';
import { UsersService } from './services/users.service';
import { RequestWithUser } from 'src/types/application.types';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';

@ApiTags('Пользователь')
@Controller('/api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение информации о пользователе' })
  @ApiBearerAuth('JWT-auth')
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
