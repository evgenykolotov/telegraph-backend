import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { VALIDATION_MASSAGES } from 'src/types/validation-messages.enum';

/**
 * @class
 * @name CreateUserDto
 * @classdesc DTO для создания пользователя в Базе Данных.
 * @property {string} email - Почтовый адрес пользователя.
 * @property {string} password - Пароль пользователя.
 * @property {string} firstName - Имя пользователя.
 * @property {string} lastName - Фамилия пользователя.
 */
export class CreateUserDTO {
  @ApiProperty({ example: 'example@email.com', description: 'Почтовый адрес' })
  @IsEmail({}, { message: VALIDATION_MASSAGES.NOT_EMAIL })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_EMAIL })
  public readonly email: User['email'];

  @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_PASSWORD })
  @Length(4, 24, { message: VALIDATION_MASSAGES.LENGTH_PASSWORD })
  public readonly password: User['password'];

  @ApiProperty({ example: 'Евгений', description: 'Имя пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_FIRST_NAME })
  public readonly firstName: User['first_name'];

  @ApiProperty({ example: 'Колотов', description: 'Фамилия пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_LAST_NAME })
  public readonly lastName: User['last_name'];
}
