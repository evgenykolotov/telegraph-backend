import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { AuthDataDTO } from './dto/auth-data.dto';
import { AuthService } from './services/auth.service';

/**
 * @class
 * @name AuthController
 * @classdesc Контроллер для маршрутов авторизации.
 */
@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {
  /**
   * @property - Максимальный срок жизни cookie.
   */
  private static readonly cookieMaxAge: number = 30 * 24 * 60 * 60 * 1000;

  /**
   * @constructor
   * @param {AuthService} authService - Сервис для работы с авторизацией и аутентификацией пользователей.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Обработчик маршрута для регистрации пользователя.
   * @public
   * @param {Response} response - Объект ответа.
   * @param {CreateUserDTO} userDto - Тело запроса на создание пользователя.
   * @returns {AuthDataDTO} - Данные с авторизацией пользователя.
   */
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiCreatedResponse({
    type: AuthDataDTO,
    description: 'Регистрация пользователя прошла успешно',
  })
  @Post('/registration')
  @UsePipes(ValidationPipe)
  public async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: CreateUserDTO,
  ): Promise<AuthDataDTO> {
    const responseData = await this.authService.registration(userDto);
    response.cookie('refresh_token', responseData.refresh_token, {
      maxAge: AuthController.cookieMaxAge,
      httpOnly: true,
    });
    return responseData;
  }
}
