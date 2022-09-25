import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';

/**
 * @class
 * @name UsersService
 * @classdesc Сервис для работы с пользователями.
 */
@Injectable()
export class UsersService {
  /**
   * @contructor
   * @param {PrismaService} prismaService - Сервис для работы с моделями prisma orm.
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Поиск пользователя в БД по email адресу.
   * @public
   * @param {string} email - email адрес для поиска в БД.
   * @returns {User} - Найденный пользователь или null.
   * @throws {NotFoundException} - Пользователь с таким email не найден.
   */
  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return user;
  }

  /**
   * Создание нового пользователя в БД.
   * @public
   * @param {CreateUserDTO} userData - DTO для создания пользователя в Базе Данных.
   * @returns {User} - Созданный пользователь в БД.
   */
  public async createUser(userData: CreateUserDTO): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
      },
    });

    return newUser;
  }

  /**
   * Поиск пользователя в БД по идентификатору.
   * @public
   * @param {string} id - идентификатор для поиска в БД.
   * @returns {User} - Найденный пользователь или null.
   * @throws {NotFoundException} - Пользователь с таким идентификатором не найден.
   */
  public async findUniqueById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    return user;
  }
}
