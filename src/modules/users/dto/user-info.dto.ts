import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDTO {
  @ApiProperty({
    example: 'ba94ebd3-2711-4973-8c63-39f85993a2ff',
    description: 'Идентификатор пользователя',
  })
  public readonly id: User['id'];

  @ApiProperty({ example: 'example@email.com', description: 'Почтовый адрес' })
  public readonly email: User['email'];

  @ApiProperty({ example: 'Evgeny', description: 'Имя пользователя' })
  public readonly firstName: User['first_name'];

  @ApiProperty({ example: 'Kolotov', description: 'Фамилия пользователя' })
  public readonly lastName: User['last_name'];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
  }
}
