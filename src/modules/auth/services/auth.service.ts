import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { EXCEPTION_MESSAGES } from 'src/types/exception-messages.enum';
import { AuthDataDTO } from '../dto/auth-data.dto';
import { LoginUserDTO } from '../dto/login-user.dto';

/**
 * @class
 * @name AuthService
 * @classdesc Сервис для работы с авторизацией и аутентификацией пользователей.
 */
@Injectable()
export class AuthService {
  /**
   * @constructor
   * @param {UsersService} usersService - Сервис для работы с пользователями.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Регистрация нового пользователя в приложении.
   * @public
   * @param {CreateUserDto} dto - Данные для создания нового пользователя.
   * @throws {BadRequestException} - Пользователь уже существует.
   * @returns {AuthDataDTO} - Информация по авторизации.
   */
  public async registration(dto: CreateUserDTO): Promise<AuthDataDTO> {
    const candidate = await this.usersService.findOneByEmail(dto.email);

    if (candidate)
      throw new BadRequestException(EXCEPTION_MESSAGES.FOUND_CANDIDATE);

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });

    return new AuthDataDTO(user);
  }

  /**
   * Авторизация пользователя в приложении.
   * @public
   * @param {LoginUserDTO} dto - Данные пользователя для авторизации в приложении.
   * @throws {NotFoundException} - Пользователь не найден.
   * @throws {BadRequestException} - Не верный логин или пароль.
   * @returns {AuthDataDTO} - Информация по авторизации.
   */
  public async login(dto: LoginUserDTO): Promise<AuthDataDTO> {
    const user = await this.usersService.findOneByEmail(dto.email);

    if (!user) throw new NotFoundException(EXCEPTION_MESSAGES.USER_NOT_FOUND);

    const isPassEquals = await bcrypt.compare(dto.password, user.password);
    if (!isPassEquals)
      throw new BadRequestException(EXCEPTION_MESSAGES.WRONG_AUTH_DATA);

    return new AuthDataDTO(user);
  }
}
