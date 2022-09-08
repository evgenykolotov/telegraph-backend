import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { AuthDataDTO } from './dto/auth-data.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
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

  /**
   * Обработчик маршрута для авторизации пользователя.
   * @public
   * @param {Response} response - Объект ответа.
   * @param {LoginUserDTO} userDto - Тело запроса на авторизацию пользователя.
   * @returns {AuthDataDTO} - Данные с авторизацией пользователя.
   */
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({
    type: AuthDataDTO,
    description: 'Авторизация пользователя прошла успешно',
  })
  @UsePipes(ValidationPipe)
  @Post('/login')
  public async login(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: LoginUserDTO,
  ): Promise<AuthDataDTO> {
    const responseData = await this.authService.login(userDto);
    response.cookie('refresh_token', responseData.refresh_token, {
      maxAge: AuthController.cookieMaxAge,
      httpOnly: true,
    });
    return responseData;
  }

  /**
   * Обработчик маршрута на сброс сессии.
   * @public
   * @param {Request} request - Объект запроса.
   * @param {Response} response - Объект ответа.
   * @returns {number}
   */
  @ApiOperation({ summary: 'Сброс сессии пользователя' })
  @ApiOkResponse({ description: 'Сессия пользователя сброшена' })
  @UseGuards(JwtAuthenticationGuard)
  @Get('/logout')
  public async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { refresh_token } = request.cookies;
    response.clearCookie('refresh_token', refresh_token);
  }

  /**
   * Обработчик маршрута на обновление токенов.
   * @param {Request} request - Объект запроса.
   * @param {Response} response - Объект ответа.
   * @returns {AuthDataDTO} - Новые токены.
   */
  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiCreatedResponse({
    type: AuthDataDTO,
    description: 'Токены успешно обновлены',
  })
  @Get('/refresh')
  public async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthDataDTO> {
    const { refresh_token } = request.cookies;
    const responseData = await this.authService.refresh(refresh_token);
    response.cookie('refreshToken', responseData.refresh_token, {
      maxAge: AuthController.cookieMaxAge,
      httpOnly: true,
    });
    return responseData;
  }
}
