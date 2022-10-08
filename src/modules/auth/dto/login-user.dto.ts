import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { VALIDATION_MASSAGES } from 'src/types/validation-messages.enum';

export class LoginUserDTO {
  @ApiProperty({ example: 'example@email.com', description: 'Почтовый адрес' })
  @IsEmail({}, { message: VALIDATION_MASSAGES.NOT_EMAIL })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_EMAIL })
  public readonly email: User['email'];

  @ApiProperty({ example: 'KoLoToVe95', description: 'Пароль пользователя' })
  @IsNotEmpty({ message: VALIDATION_MASSAGES.EMPTY_PASSWORD })
  @Length(4, 24, { message: VALIDATION_MASSAGES.LENGTH_PASSWORD })
  public readonly password: User['password'];
}
