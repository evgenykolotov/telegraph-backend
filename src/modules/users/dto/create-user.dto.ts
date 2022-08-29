import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { VALIDATION_MASSAGES } from 'src/types/validation-messages.enums';

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
  public readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_PASSWORD })
  @Length(4, 24, { message: VALIDATION_MASSAGES.LENGTH_PASSWORD })
  public readonly password: string;

  @ApiProperty({ example: 'Евгений', description: 'Имя пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_FIRST_NAME })
  public readonly firstName: string;

  @ApiProperty({ example: 'Колотов', description: 'Фамилия пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_LAST_NAME })
  public readonly lastName: string;
}
