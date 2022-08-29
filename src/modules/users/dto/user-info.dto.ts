import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';

/**
 * @class
 * @name UserInfoDTO
 * @classdesc DTO с информацией о пользователе.
 * @property {string} id - Уникальный идентификатор пользователя.
 * @property {string} email - Почтовый адрес пользователя.
 * @property {string} firstName - Имя пользователя.
 * @property {string} lastName - Фамилия пользователя.
 */
export class UserInfoDTO {
  @ApiProperty({
    example: 'ba94ebd3-2711-4973-8c63-39f85993a2ff',
    description: 'Идентификатор пользователя',
  })
  public readonly id: string;

  @ApiProperty({ example: 'example@email.com', description: 'Почтовый адрес' })
  public readonly email: string;

  @ApiProperty({ example: 'Evgeny', description: 'Имя пользователя' })
  public readonly firstName: string;

  @ApiProperty({ example: 'Kolotov', description: 'Фамилия пользователя' })
  public readonly lastName: string;

  /**
   * @constructor
   * @param {UserModel} user - Пользователь из БД.
   */
  constructor(user: UserModel) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
  }
}
