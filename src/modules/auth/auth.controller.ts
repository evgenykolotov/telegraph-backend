import {
  Get,
  Res,
  Req,
  Body,
  Post,
  UsePipes,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthDataDTO } from './dto/auth-data.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './services/auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {
  private static readonly cookieMaxAge: number = 30 * 24 * 60 * 60 * 1000;

  constructor(private readonly authService: AuthService) {}

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
